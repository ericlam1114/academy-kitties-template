
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.cat__head, .cat__chest').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('Color: #'+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function mouthBodyTailColor(color,code) {
    $('.cat__tail, .cat__chest_inner, .cat__mouth-contour').css('background', '#' + color)  //This changes the color of the cat
    $('#mBTCode').html('Color: #'+code) //This updates text of the badge next to the slider
    $('#dnamouth').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function eyeColor(color,code) {
    $('.pupil-left, .pupil-right').css('background', '#' + color)  //This changes the color of the cat
    $('#eyeCode').html('Color: #'+code) //This updates text of the badge next to the slider
    $('#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function ePColor(color,code) {
    $('.cat__paw-left, .cat__paw-right, .cat__ear--left, .cat__ear--right, .cat__paw-right_inner, .cat__paw-left_inner').css('background', '#' + color)  //This changes the color of the cat
    $('#ePCode').html('Color: #'+code) //This updates text of the badge next to the slider
    $('#dnaears').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function innerHair(color,code) {
    $('#midDot').css('background', '#' + color)  //This changes the color of the cat
    $('#innerHairName').html('Color: #'+code) //This updates text of the badge next to the slider
    $('#dnadecoration').html(code) //This updates the body color part of the DNA that is displayed below the cat
}
function outerHair(color,code) {
    $('#leftDot, #rightDot').css('background', '#' + color)  //This changes the color of the cat
    $('#outerHairName').html('Color: #'+code) //This updates text of the badge next to the slider
    $('#dnadecorationSides').html(code) //This updates the body color part of the DNA that is displayed below the cat
}


//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic')
            break
        case 2: 
            normalEyes()
            $('#eyeName').html('Chill')
            return eyesType1()
            break
        case 3: 
            normalEyes()
            $('#eyeName').html('Dreamy')
            return eyesType2()
            break
        case 4: 
            normalEyes()
            $('#eyeName').html('High')
            return eyesType3()
            break
        case 5: 
            normalEyes()
            $('#eyeName').html('Sleepy')
            return eyesType4()
            break
        case 6: 
            normalEyes()
            $('#eyeName').html('Side-Eye')
            return eyesType5()
            break
        default: 
        console.log('Not 1 or 2');
        
    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#hairName').html('Basic')
            normaldecoration()
            break
        case 2:
            $('#hairName').html('Litty')
            decorationType1()
            break
        case 3:
            $('#hairName').html('Receding')
            decorationType2()
            break
        case 4:
            $('#hairName').html('Weirdo')
            decorationType3()
            break
        case 5:
            $('#hairName').html('MoonCat')
            decorationType4()
            break
       
    }
}

async function normalEyes() {
    await $('.cat__eye').find('span').css('border', 'none')
}
async function eyesType1() {
    await $('.cat__eye').find('span').css('border-top', '15px solid white')
}
async function eyesType2() {
    await $('.cat__eye').find('span').css('border-bottom', '15px solid white')
}
async function eyesType3() {
    await $('.cat__eye').find('span').css('border-top', '15px solid red')
}
async function eyesType4() {
    await $('.cat__eye').find('span').css('border-top', '25px solid white')
}
async function eyesType5() {
    await $('.cat__eye').find('span').css('border-left', '25px solid white')
}

async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
async function decorationType1() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(45deg)", "height": "58px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
async function decorationType2() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(180deg)", "height": "20px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "10px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "10px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
async function decorationType3() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "58px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(35deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(325deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
async function decorationType4() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "20px", "top": "7px", "border-radius": "50%" })
    $('.cat__head-dots_first').remove()
    $('.cat__head-dots_second').remove()
}

