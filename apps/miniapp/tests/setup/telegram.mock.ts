// Full Telegram WebApp mock for testing
export const createTelegramMock = () => {
  const mockTelegram = {
    WebApp: {
      ready: () => {},
      expand: () => {},
      close: () => {},
      
      // Main Button
      MainButton: {
        text: 'CONTINUE',
        color: '#2481cc',
        textColor: '#ffffff',
        isVisible: false,
        isProgressVisible: false,
        isActive: true,
        setText: (text: string) => { mockTelegram.WebApp.MainButton.text = text },
        onClick: (callback: () => void) => { mockTelegram.WebApp.MainButton._onClick = callback },
        show: () => { mockTelegram.WebApp.MainButton.isVisible = true },
        hide: () => { mockTelegram.WebApp.MainButton.isVisible = false },
        enable: () => { mockTelegram.WebApp.MainButton.isActive = true },
        disable: () => { mockTelegram.WebApp.MainButton.isActive = false },
        showProgress: () => { mockTelegram.WebApp.MainButton.isProgressVisible = true },
        hideProgress: () => { mockTelegram.WebApp.MainButton.isProgressVisible = false },
        setParams: (params: any) => { Object.assign(mockTelegram.WebApp.MainButton, params) },
        _onClick: () => {}
      },

      // Back Button
      BackButton: {
        isVisible: false,
        onClick: (callback: () => void) => { mockTelegram.WebApp.BackButton._onClick = callback },
        show: () => { mockTelegram.WebApp.BackButton.isVisible = true },
        hide: () => { mockTelegram.WebApp.BackButton.isVisible = false },
        _onClick: () => {}
      },

      // Haptic Feedback
      HapticFeedback: {
        impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => {},
        notificationOccurred: (type: 'error' | 'success' | 'warning') => {},
        selectionChanged: () => {}
      },

      // Theme and colors
      themeParams: {
        bg_color: '#ffffff',
        text_color: '#000000',
        hint_color: '#999999',
        link_color: '#2481cc',
        button_color: '#2481cc',
        button_text_color: '#ffffff',
        secondary_bg_color: '#f1f1f1',
        header_bg_color: '#ffffff'
      },

      colorScheme: 'light' as 'light' | 'dark',

      // User data
      initDataUnsafe: {
        user: {
          id: 123456789,
          is_bot: false,
          first_name: 'Test',
          last_name: 'User',
          username: 'testuser',
          language_code: 'en'
        },
        hash: 'test_hash',
        auth_date: Math.floor(Date.now() / 1000),
        start_param: 'test_param'
      },

      // Platform and version
      platform: 'unknown',
      version: '6.7',
      isExpanded: false,
      viewportHeight: 667,
      viewportStableHeight: 667,

      // Methods
      sendData: (data: string) => {},
      switchInlineQuery: (query: string, choose_chat_types?: string[]) => {},
      openLink: (url: string, options?: { try_instant_view?: boolean }) => {},
      openTelegramLink: (url: string) => {},
      showPopup: (params: {
        title?: string;
        message: string;
        buttons?: Array<{ id?: string; type?: string; text: string }>;
      }, callback?: (buttonId?: string) => void) => {
        if (callback) callback('ok');
      },
      showAlert: (message: string, callback?: () => void) => {
        if (callback) callback();
      },
      showConfirm: (message: string, callback?: (confirmed: boolean) => void) => {
        if (callback) callback(true);
      },

      // Events
      onEvent: (eventType: string, eventHandler: () => void) => {},
      offEvent: (eventType: string, eventHandler: () => void) => {}
    }
  };

  return mockTelegram;
};