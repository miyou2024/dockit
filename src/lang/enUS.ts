export const enUS = {
  aside: {
    connect: 'Connect',
    file: 'File',
    history: 'History',
    github: 'GitHub',
    user: 'User',
    setting: 'Setting',
    chatBot: 'AI Assistant',
  },
  setting: {
    basic: 'Basic',
    theme: 'Theme',
    language: 'Language',
    about: 'About Us',
    auto: 'Follow OS',
    dark: 'Dark Theme',
    light: 'Light Theme',
    ai: {
      title: 'GPTs',
      others: 'Other GPTs',
      model: 'Model',
      modelPlaceholder: 'Please enter the GPT model name',
      apiKey: 'API Key',
      apiKeyPlaceholder: 'Please enter the API Key',
      prompt: 'Prompt',
      proxy: 'Network Proxy',
      form: {
        reset: 'Reset',
        save: 'Save & Enable',
      },
      invalid: 'GPT configuration is invalid!',
      missing: 'GPT is not configured or not enabled',
      defaultPrompt: `You are a professional database developer, familiar with Elasticsearch and OpenSearch,  users will ask the questions like: list all indices in database,  the user will provide you the related index name, index mapping, your responsibility is to write Query DSL queries to answer questions. the Query DSL response should  in a json code block and follow the format:
        \`\`\`json
        <method> <path>
        <Query DSL>
        \`\`\`
        remove the slash at the start of the path, the body is a JSON object and its optional and should start as new line if it represents, you can use the provided index name and index mapping in the body to answer the question.`,
    },
  },
  connection: {
    new: 'New connection',
    test: 'Test connection',
    name: 'Name',
    host: 'Host',
    port: 'Port',
    username: 'Username',
    password: 'Password',
    queryParameters: 'query parameters',
    sslCertVerification: 'SSL Certificate Verification',
    add: 'Add connection',
    edit: 'Edit connection',
    testSuccess: 'connect success',
    formValidation: {
      nameRequired: 'Name is required',
      hostRequired: 'Host is required',
      portRequired: 'Port is required',
      sslCertOnlyHttps: 'SSL Certificate Verification can only be enabled under HTTPS connection',
    },
    operations: {
      connect: 'Connect',
      edit: 'Edit',
      remove: 'Remove',
    },
    selectIndex: 'No collection/index selected',
    validationFailed: 'Form validation failed!',
    unAuthorized: 'Authorization failed, ensure your username and password are correct',
  },
  dialogOps: {
    warning: 'Warning',
    removeNotice: 'Remove the connection permanently?',
    confirm: 'Confirm',
    cancel: 'Cancel',
    removeSuccess: 'Connection removed successfully',
  },
  editor: {
    establishedRequired: 'Select a DB instance before execute actions',
    invalidJson: 'Invalid JSON format',
  },
  history: {
    empty: 'No history yet',
    emptyDesc: 'History of queries will appear here as you execute Scans and Queries',
  },
  version: {
    newVersion: 'New version available',
    message: 'A new version is available, download it now',
    download: 'Download',
    skip: 'Skip this version',
    later: 'Later',
  },
  login: {
    title: 'Log In',
    name: 'User Name',
    password: 'User Password',
    forget: 'Forgot password?',
    register: 'No account? Register Now',
    enterName: 'Please enter one user name',
    enterPwd: 'Please enter password',
  },
};
