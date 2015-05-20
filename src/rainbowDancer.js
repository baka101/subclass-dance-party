var RainbowDancer = function(top, left, timeBetweenSteps, colors) {
  this.colors = colors || ['purple', 'blue', 'cyan', 'green', 'yellow', 'orange', 'red'];
  Dancer.call(this, top, left, timeBetweenSteps);
};

RainbowDancer.prototype = Object.create(BlinkyDancer.prototype);
RainbowDancer.prototype.constructor = RainbowDancer;

RainbowDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  var index = Math.floor(Math.random() * this.colors.length);
  var newProp = '10px solid ' + this.colors[index];
  this.$node.css('border', newProp);
};
