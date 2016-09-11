/**
 * Created by Administrator on 2016/07/08.
 */
describe("Suite for data format test ", function() {
    it("spec for isTimeIDFormat", function() {
        var timeID = "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155";

        var result = isTimeIDFormat(timeID);

        expect(result).toBe(true);
    });
     it("spec for isTimeFormat", function() {
        var time = "2016/09/02 22:30:46";

        var result = isTimeFormat(time);

        expect(result).toBe(true);
    });
    it("spec for isPositionFormat with initial position", function() {
        var position = "cat2 2 3";

        var result = isPositionFormat(position);

        expect(result).toBe(true);
    });
    it("spec for isPositionFormat with not-initial position", function() {
        var position = "cat1 12 8 3 4";

        var result = isPositionFormat(position);

        expect(result).toBe(true);
    });
    it("spec for isPositionFormat with not-initial position with negetive number", function() {
        var position = "cat1 10 9 2 -1";

        var result = isPositionFormat(position);

        expect(result).toBe(true);
    });
});




describe("Suite for data transfer test.",function(){
     it("spec for animalSplit with initial position", function(){
         var animalDataStr = "cat1 12 8";

         var result = animalSplit(animalDataStr);

         expect(result).toEqual(["cat1", "12", "8"]);

    });
    it("spec for animalSplit with not-initial position", function(){
         var animalDataStr = "cat1 12 8 3 4";

         var result = animalSplit(animalDataStr);

         expect(result).toEqual(["cat1", "12", "8", "3", "4"]);

    });
    
});
/*
describe("The 'toBe' matcher compares with ===",function(){
    it("and has a positive case",function(){
        expect(true).toBe(true);
    });
    it("and can have a negative case", function () {
        expect(false).not.toBe(true);
    });
});

describe("Included matchers:",function(){
    it("The 'toBe' Matcher:",function(){
        var a = 3.6;
        var b = a;
        expect(a).toBe(b);
        expect(a).not.toBe(true);
    });
    describe("The 'toEqual' matcher:",function(){
        it("works for simple literals and variables",function(){
            var a = "VarA";
            expect(a).toEqual("VarA");
        });
        it("work for objects",function(){
            var obj = {
                a:1,
                b:4
            };
            var obj2 = {
                a:1,
                b:4
            };
            expect(obj).toEqual(obj2);
        });
    });

    it("The 'toMatch' matcher is for regular expressions",function(){
        var message = "foo bar baz";
        expect(message).toMatch(/bar/);
        expect(message).toMatch("bar");
        expect(message).not.toMatch(/quux/);
    });

    it("The 'toBeDefined' matcher:",function(){
        var obj = {
            defined:'defined'
        };
        var obj2;
        expect(obj.defined).toBeDefined();
        expect(obj.undefined).not.toBeDefined();
        expect(obj2).not.toBeDefined();
    });

    it("The 'toBeUndefined' matcher compares aginst 'undefined'", function () {
        var a = {
            foo:"foo"
        };
        expect(a.foo).not.toBeUndefined();
        expect(a.bar).toBeUndefined();
    });

    it("The 'toBeNull' matcher compares against null",function(){
        var a = null;
        var foo = "foo";
        expect(null).toBeNull();
        expect(a).toBeNull();
        expect(foo).not.toBeNull();
    });

    it("The 'toBeTruthy' matcher is for boolean casting testing",function(){
        var a,foo = "foo";
        expect(foo).toBeTruthy();
        expect(a).not.toBeTruthy();
    });

    it("The 'toBeFalsy' matcher is for boolean casting testing", function () {
        var a, foo = "foo";
        expect(a).toBeFalsy();
        expect(foo).not.toBeFalsy();
    });

    it("The 'toContain' matcher is for finding an item in an Array",function(){
        var a = ["foo", "bar", "baz"];
        expect(a).toContain("bar");
        expect(a).not.toContain("quux");
    });

    it("The 'toBeLessThan' matcher is for mathematical comparisons",function(){
        var pi = 3.1415926,
            e = 2.78;
        expect(e).toBeLessThan(pi);
        expect(pi).not.toBeLessThan(e);
    });

    it("The 'toBeGreaterThan' matcher is for mathematical comparisons",function(){
        var pi = 3.1415926,
            e = 2.78;
        expect(pi).toBeGreaterThan(e);
        expect(e).not.toBeGreaterThan(pi);
    });

    it("The 'toBeCloseTo' matcher is for precision math comparison", function () {
        var pi = 3.1415926,
            e = 2.78;
        expect(pi).not.toBeCloseTo(e,2);
        expect(pi).toBeCloseTo(e,0);
        expect(pi).toBeCloseTo(3.092,1);
    });

    it("The 'toThrow' matcher is for testing if a function throws an expection", function () {
        var foo = function(){
            return 1+2;
        };
        var bar = function() {
            return a + 1;
        };
        expect(foo).not.toThrow();
        //expect(bar).toThrow();!!!!!!!!!!!!!!!!!!
    });

    it("The 'toThrowError' matcher is for testing a specific thrown exception", function () {
        var foo = function(){
            throw  new TypeError("foo bar baz");
        };
        expect(foo).toThrowError("foo bar baz");
        expect(foo).toThrowError(/bar/);
        expect(foo).toThrowError(TypeError);
        expect(foo).toThrowError(TypeError,"foo bar baz");
    })

});

describe("A spec",function(){
    beforeEach(function(){
        this.foo = 0;
    });

    it("can use the 'this' to share state",function(){
        expect(this.foo).toEqual(0);
        this.bar = "test pollution";
    });

    it("prevents test pollution by having an empty 'this' created for the next spec", function () {
        expect(this.foo).toEqual(0);
        expect(this.bar).toBe(undefined);
    })
});

describe("test 'this' in 'beforeAll'",function(){
    beforeAll(function () {
        this.foo = 0;
    });

    it("spec1:",function(){
        this.foo ++;
        expect(this.foo).toEqual(1);
    });
    it("spec2", function () {
        this.foo += 2;
        expect(this.foo).toEqual(2);
    });
});


describe("A spec",function(){
    var foo;

    beforeEach(function () {
        foo = 0;
        foo += 1;
    });
    afterEach(function () {
        foo = 0;
    });
    it("is just a function, so it can contain any code", function () {
        expect(foo).toEqual(1);
    });
    it("can have more than one expection", function () {
        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });

    describe("nested inside a second describe", function () {
        var bar;

        beforeEach(function () {
            bar = 1;
        });

        it("can reference both scopes as needed", function () {
            expect(foo).toEqual(bar);
        });
    });
});

xdescribe("A spec",function(){
    var foo;

    beforeEach(function () {
        foo = 0;
        foo += 1;
    });
    it("it just a function, so it can contain any code", function () {
        expect(foo).toEqual(1);
    });
});

describe("Pending specs", function () {

    xit("can be declared 'xit'", function(){
        expect(true).toBe(false);
    });
    it("can be declared with 'it' without a function");
    it("can be declared by calling 'pending' in the spec body", function () {
        expect(true).toBe(false);
        pending();
    });
});


describe("A spy", function () {
    var foo,bar = null;
    var baz = null;
    var fetchedBaz;

    beforeEach(function () {
        foo = {
            setBar:function(value){
                bar = value;
            },
            setBaz:function(value){
                baz = value;
            },
            getBaz:function(){
                return baz;
            }
        };
        spyOn(foo,"setBar");
        spyOn(foo,'setBaz').and.callThrough();
        spyOn(foo,'getBaz').and.callThrough();
        //spyOn(foo,"setBaz").and.callThrough();


        foo.setBar(123);
        foo.setBar(456,"another param");
        foo.setBaz(789);
        fetchedBaz = foo.getBaz();
        //foo.getBaz.and.stub();
        foo.setBaz.and.stub();
    });

    it("tracks that the spy was called", function () {
        expect(foo.setBar).toHaveBeenCalled();
    });

    it("tracks all the arguments of its calls",function(){
        expect(foo.setBar).toHaveBeenCalledWith(123);
        expect(foo.setBar).toHaveBeenCalledWith(456,"another param");
        expect(foo.setBar).not.toHaveBeenCalledWith(456);
    });

    it("stop all execution on a function", function () {
        expect(bar).toBeNull();
        expect(foo).not.toBeNull();

        expect(baz).toEqual(789);
        expect(fetchedBaz).toEqual(789);
    })
});




describe("Asynchronous specs", function () {
    var value;

    beforeEach(function(done){
        value = 0;
        done();
    },1);

    it("should support async execution of test preparation and expectations", function(done){
        value ++;
        expect(value).toBeGreaterThan(0);
        done();
    });

    describe("long asynchronous specs", function(){
        var originalTimeout;
        beforeEach(function(){
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        });
        it("takes a long time", function(done){
            setTimeout(function () {
                done();
            },9000);
        });
        afterEach(function(){
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});


*/