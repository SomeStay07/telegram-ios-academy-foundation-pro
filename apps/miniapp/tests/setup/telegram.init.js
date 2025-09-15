// Initialize Telegram WebApp mock before app loads
Object.defineProperty(window, 'Telegram', {
  value: {
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
        setText: function(text) { this.text = text },
        onClick: function(callback) { this._onClick = callback },
        show: function() { this.isVisible = true },
        hide: function() { this.isVisible = false },
        enable: function() { this.isActive = true },
        disable: function() { this.isActive = false },
        showProgress: function() { this.isProgressVisible = true },
        hideProgress: function() { this.isProgressVisible = false },
        setParams: function(params) { Object.assign(this, params) },
        _onClick: function() {}
      },

      // Back Button
      BackButton: {
        isVisible: false,
        onClick: function(callback) { this._onClick = callback },
        show: function() { this.isVisible = true },
        hide: function() { this.isVisible = false },
        _onClick: function() {}
      },

      // Haptic Feedback
      HapticFeedback: {
        impactOccurred: function(style) {},
        notificationOccurred: function(type) {},
        selectionChanged: function() {}
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

      colorScheme: 'light',

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
      sendData: function(data) {},
      switchInlineQuery: function(query, choose_chat_types) {},
      openLink: function(url, options) {},
      openTelegramLink: function(url) {},
      showPopup: function(params, callback) {
        if (callback) callback('ok');
      },
      showAlert: function(message, callback) {
        if (callback) callback();
      },
      showConfirm: function(message, callback) {
        if (callback) callback(true);
      },

      // Events
      onEvent: function(eventType, eventHandler) {},
      offEvent: function(eventType, eventHandler) {}
    }
  },
  writable: false,
  configurable: false
});