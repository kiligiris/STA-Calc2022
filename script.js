$(function(){
    var nums = ["0"]
    var calc = []
    var idx = 0

    $("#ac").on("click", function() {
        nums = ["0"]
        calc = []
        idx = 0
        display()
    })

    $("#oc").on("click", function() {
        if($("#disp").text() != 0){
            if(nums.length == idx + 1){
                nums[idx] = nums[idx].slice(0, -1);
                if(nums[idx] == "") {
                    nums[idx] = "0"
                }
                display()
            }
        }
    })

    $("#sqd").on("click", function() {
        if(nums.length == idx + 1){
            nums[idx] = nums[idx] ** 2
            display()
        }
    })

    $("#sqr").on("click", function() {
        if(nums.length == idx + 1){
            nums[idx] = nums[idx] ** 0.5
            display()
        }
    })

    $(".num").on("click", function() {
        var click =  $(this).text()
        if($("#disp").text() != 0){
            if(nums.length == idx + 1){
                nums[idx] +=  click
            } else {
                nums[idx] =  click
            }
            display()
        } else {
            nums[idx] = click
            display()
        }
    });

    $("#dot").on("click", function() {
        var click =  "."
        if($("#disp").text() != 0){
            if(nums.length == idx + 1){
                nums[idx] += click
            } else {
                nums[idx] = "0" + click
            }
            display()
        } else {
            nums[idx] = "0" + click
            display()
        }
    });

    $(".calc").on("click", function() {
        if(nums.length == idx + 1){
            calc.push($(this).text())
            idx += 1
        } else {
            if(calc[idx] === undefined) {
                calc[idx - 1] = $(this).text()
            }
        }
        display()
    });

    $("#equal").on("click", function() {
        // 数字しか入力されていない場合はreturn
        if(nums.length == 0) {
            return
        } else if(nums.length == 1 && calc.length == 0) {
            return
        }
        if(nums.length == calc.length) {
            nums.push(nums[nums.length - 1])
        }
        console.log(nums,calc)
        display()
        $("#cldisp").append("=")
        
        nums = nums.map(Number)
        // まずは積と商を求める
        var i = 0
        while(i < calc.length) {
            if(calc[i] == "×") {
                calculator(i, nums[i] * nums[i + 1])
            } else if(calc[i] == "÷") {
                calculator(i, nums[i] / nums[i + 1])
            } else {
                i++
            }
        }
        console.log(nums,calc)

        // 和と差を求める
        var i = 0
        while(i < calc.length) {
            if(calc[i] == "+") {
                calculator(i, nums[i] + nums[i + 1])
            } else if(calc[i] == "-") {
                calculator(i, nums[i] - nums[i + 1])
            } else {
                i++
            }
        }
        console.log(nums,calc)

        nums[0] = String(nums[0])
        // 答えの表示
        $("#disp").text(nums[0])
        idx = 0
    })
    
    function display() {
        if(nums.length == 0) {
            $("#cldisp").text("")
            $("#disp").text(0)
            console.log(000)
            return
        }
        cldisp = []
        if(nums.length == calc.length) {
            cldisp = cldisp_create(nums.length)
        } else {
            cldisp = cldisp_create(calc.length)
            cldisp.push(nums[nums.length - 1])
        }

        $("#cldisp").text(cldisp.join(""))

        $("#disp").text(nums[idx])
    }
    // 計算式を作成
    function cldisp_create(num) {
        cldisp = []
        for(let i = 0; i < num; i++){
            cldisp.push(nums[i])
            cldisp.push(calc[i])
        }
        return cldisp
    }

    function calculator(i, n) {
        nums.splice(i,2,n)
        calc.splice(i,1)
    }

});