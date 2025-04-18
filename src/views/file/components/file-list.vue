<template>
  <div @contextmenu.prevent="showContextMenu($event, undefined)" class="file-list-container">
    <n-scrollbar style="height: 100%">
      <div class="scroll-container">
        <div
          v-for="(file, index) in fileList"
          :class="getClass(file, index)"
          @click="handleClick(ClickType.SINGLE, file)"
          @dblclick="handleClick(ClickType.DOUBLE, file)"
          @contextmenu.prevent="showContextMenu($event, file)"
        >
          <n-icon size="30" v-if="file.type === PathTypeEnum.FOLDER" color="#0e7a0d">
            <Folder />
          </n-icon>
          <span class="file-item-name">{{ file.name }}</span>
          <context-menu
            v-if="contextMenuVisible"
            :position="contextMenuPosition"
            :file="selectedFile"
            @context-menu-action-emit="handleContextMenu"
          />
        </div>
        <new-file-dialog ref="newFileDialogRef" />
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ContextMenuAction, useFileStore } from '../../../store';
import { Folder } from '@vicons/carbon';
import { useLang } from '../../../lang';
import ContextMenu from './context-menu.vue';
import NewFileDialog from './new-file-dialog.vue';
import { PathInfo, PathTypeEnum } from '../../../datasources';

const router = useRouter();
const message = useMessage();
const lang = useLang();
const fileStore = useFileStore();
const { deleteFileOrFolder, changeDirectory } = fileStore;
const { fileList } = storeToRefs(fileStore);

const activeRef = ref<PathInfo>();

enum ClickType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
}

const handleClick = async (type: ClickType, file: PathInfo) => {
  activeRef.value = file;
  if (type === ClickType.DOUBLE) {
    if (file.type === PathTypeEnum.FOLDER) {
      await changeDirectory(file.path);
    } else {
      if (file.path.endsWith('.search')) {
        router.push({ name: 'Connect', params: { filePath: file.path } });
      } else {
        message.error(lang.t('editor.unsupportedFile'), {
          closable: true,
          keepAliveOnHover: true,
          duration: 3600,
        });
      }
    }
  }
};

const selectedFile = ref<PathInfo>();
const newFileDialogRef = ref();
const contextMenuVisible = ref(false);
const contextMenuPosition = ref({ x: 0, y: 0 });

const showContextMenu = (event: MouseEvent, file?: PathInfo) => {
  // Prevent the event from propagating further
  event.stopPropagation();
  activeRef.value = file;
  selectedFile.value = file;
  contextMenuPosition.value = { x: event.layerX, y: event.layerY };
  contextMenuVisible.value = true;
};

const handleClickOutside = (event: MouseEvent) => {
  if (!(event.target as HTMLElement).closest('.context-menu')) {
    contextMenuVisible.value = false;
  }
};

const handleContextMenu = async (action: ContextMenuAction) => {
  contextMenuVisible.value = false;
  if (action === ContextMenuAction.CONTEXT_MENU_ACTION_OPEN) {
    if (selectedFile.value?.type === PathTypeEnum.FOLDER) {
      await changeDirectory(selectedFile.value?.path);
    } else {
      if (selectedFile.value?.path.endsWith('.search')) {
        router.push({ name: 'Connect', params: { filePath: selectedFile.value?.path } });
      } else {
        message.error(lang.t('editor.unsupportedFile'), {
          closable: true,
          keepAliveOnHover: true,
          duration: 3600,
        });
      }
    }
  } else if (action === ContextMenuAction.CONTEXT_MENU_ACTION_DELETE) {
    deleteFileOrFolder(selectedFile.value?.path ?? '');
  } else {
    newFileDialogRef.value.showModal(action, selectedFile.value);
  }
};

const getClass = (file: PathInfo, index: number) => {
  if (activeRef.value === file) {
    return 'file-item-active';
  } else if (index === fileList.value.length - 1) {
    return 'file-item';
  } else {
    return 'file-item-hover';
  }
};

changeDirectory();

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="scss" scoped>
.file-list-container {
  flex: 1;
  height: 0;
  padding-bottom: 10px;
  background-color: var(--bg-color-secondary);

  .scroll-container {
    .file-item {
      display: flex;
      width: 100%;
      align-items: center;
      padding: 5px 10px;
      cursor: pointer;

      .file-item-name {
        margin-left: 5px;
      }
    }

    .file-item-hover {
      @extend .file-item;

      &:hover {
        background-color: var(--connect-list-hover-bg);
      }
    }

    .file-item-active {
      @extend .file-item;
      background-color: var(--connect-list-hover-bg);
    }
  }
}
</style>
