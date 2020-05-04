(function () {

    function AnimationUtil() {
        var that = this;
        var frame = 0;
        var duration = 300;
        var t = 0;
        var interpolator = function (t) {
            return t;
        };
        var finalFrame = 30 / 1000 * duration;
        var startTime;
        var delay = 0;
        var repeatCount = 1;
        var targets = [];
        this.isRunning = false;

        var animateTargets = function (value) {
            for (var i = 0; i < targets.length; i++) {
                targets[i](value);
            }
        };

        var getCurrentTime = function () {
            return window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
        };

        var startAnimation = function (val, callback) {
            return function () {
                for (var i = 0; i < repeatCount; i++) {
                    setTimeout(function () {
                        setTimeout(function reverse() {
                            if (frame == 0) {
                                startTime = getCurrentTime();
                            }
                            var timeStampIn = getCurrentTime();
                            t = (timeStampIn - startTime) / duration;
                            var value = interpolator(t);

                            if (t >= 1.0) {
                                value = 1;
                                cancelAnimationFrame(reverse);
                                animateTargets(val(value));
                                frame = 0;
                                t = 0;
                                that.onAnimationEnd();
                                callback();
                            } else {
                                requestAnimationFrame(reverse);
                                animateTargets(val(value));
                                frame++;
                            }
                        }, delay);
                    }, (delay + duration) * i);
                }
            };
        };

        return new Object({
            isRunning: that.isRunning,
            start: function () {
                var object = this;
                if (!object.isRunning) {
                    object.isRunning = true;
                    startAnimation(function (value) {
                        return value;
                    }, function () {
                        object.isRunning = false;
                    })();
                }
            },
            reverse: function () {
                var object = this;
                if (!object.isRunning) {
                    object.isRunning = true;
                    startAnimation(function (value) {
                        return 1 - value;
                    }, function () {
                        object.isRunning = false;
                    })();
                }
            },
            setInterpolator: function (interpol) {
                interpolator = interpol;
                return this;
            },
            setDuration: function (dur) {
                duration = dur;
                finalFrame = 30 / 1000 * dur;
                return this;
            },
            addTarget: function (animation) {
                targets.push(animation);
                return this;
            },
            setEndListener: function (listener) {
                that.onAnimationEnd = listener;
                return this;
            },
            setStartDelay: function (startDelay) {
                delay = startDelay;
                return this;
            },
            setRepeatCount: function (count) {
                repeatCount = count;
                return this;
            }
        });
    }

    window.AnimationUtil = AnimationUtil;
})();