describe("Dancer", function() {

  var littleDancer;
  var timeBetweenSteps = 1000;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    littleDancer = new Dancer(10, 20, timeBetweenSteps);
  });

  it("should have a jQuery $node object", function(){
    expect(littleDancer.$node).to.be.an.instanceof(jQuery);
  });

  it("should have a step function that works", function() {
    littleDancer.step();
    expect(littleDancer.step).to.be.a('function');
  });

  describe("dance", function(){
    it("should call step at least once per second", function(){
      sinon.spy(littleDancer, "step");
      expect(littleDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(littleDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(littleDancer.step.callCount).to.be.equal(2);
    });
  });
});
