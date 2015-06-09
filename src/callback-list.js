//callback=list.js
;(function(global) {
  'use strict'
  var callbackQueue = function() {
    return {
      callback: [],
      method: function(callback) {
        if (typeof callback === 'function') {
          this.callback.push(callback)
        }
        return this.callback
      },
      exec: function(context) {
        var list = this.callback;
        for (var i = 0, len = list.length; i < len; i++) {
          list[i] && list[i].call(context || global)
        }
        return this
      },
      init: function(callback, context) {
        this.method(callback)
        this.exec(context)
        this.callback = []
        return this
      }
    }
  }()
  if (typeof define === 'function' && define.amd) {
    define(callbackQueue)
  }
  global.callbackQueue = callbackQueue
})(this)