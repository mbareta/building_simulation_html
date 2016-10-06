var StateBuffer = {

  buffer: [],
  initialState: {},
  currentIndex: -1,
  limit: 20,

  undo: function() {
    var nextIndex = this.currentIndex - 1;
    if (nextIndex >= 0) {
      this.currentIndex = nextIndex;
      return this.buffer[nextIndex];
    } else {
      this.currentIndex = -1;
      return this.initialState;
    }
  },

  redo: function() {
    var nextIndex = this.currentIndex + 1;
    if (nextIndex < this.buffer.length) {
      this.currentIndex = nextIndex;
      return this.buffer[nextIndex];
    } else {
      return null;
    }
  },

  storeState: function(state) {
    // remove the first item from array if the limit has been crossed
    if (this.buffer.length >= this.limit) {
      this.buffer.shift();
      this.currentIndex--;
    }

    // If we are not on the top of the stack (eg last state) and we make a change, reject all states
    // after the currently selected state (currentIndex < stack.length - 1)
    if (this.currentIndex < this.buffer.length - 1) {
      this.buffer.splice(this.currentIndex + 1, this.buffer.length - this.currentIndex + 1);
      this.currentIndex = this.buffer.length - 1;
    } else {
      this.currentIndex++;
    }

    this.buffer.push(this._deepCopy(state));
  },

  clear: function(initialState) {
    this.buffer = [];
    this.currentIndex = -1;
    this.initialState = this._deepCopy(initialState);
  },

  init: function(initialState) {
    this.initialState = this._deepCopy(initialState);
  },

  _deepCopy: function(object) {
    return JSON.parse(JSON.stringify(object));
  },

  isDirty: function() {
    return this.buffer.length > 0;
  }
}
