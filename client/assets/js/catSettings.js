
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 10,
    "mouthBodyTailColor" : 13,
    "eyeColorPupil" : 96,
    "ePColor" : 10,
    //Cattributes
    "eyeShape" : 1,
    "decorationPattern" : 1,
    "innerHair" : 13,
    "outerHair" : 50,
    "animation" :  2,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyeColorPupil);
  $('#dnaears').html(defaultDNA.earsColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()


    return parseInt(dna)

}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    $('#bodycolor').val(dna.headcolor)
    mouthBodyTailColor(colors[dna.mouthBodyTailColor],dna.mouthBodyTailColor)
    $('#mouthBodyTailColor').val(dna.mouthBodyTailColor)
    eyeColors(colors[dna.eyeColorPupil],dna.eyeColorPupil)
    $('#eyeColor').val(dna.eyeColorPupil)
    ePColor(colors[dna.ePColor],dna.ePColor)
    $('#ePColor').val(dna.ePColor)
    innerHair(colors[dna.innerHair],dna.innerHair)
    $('#innerHair').val(dna.innerHair)
    outerHair(colors[dna.outerHair],dna.outerHair)
    $('#outerHair').val(dna.outerHair)
    animationVariation(dna.animation);
    $("#animation").val(dna.animation);
   
}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})
$('#mouthBodyTailColor').change(()=>{
    var colorVal = $('#mouthBodyTailColor').val()
    mouthBodyTailColor(colors[colorVal],colorVal)
})
$('#eyeColor').change(()=>{
    var colorVal = $('#eyeColor').val()
    eyeColors(colors[colorVal],colorVal)
})
$('#ePColor').change(()=>{
    var colorVal = $('#ePColor').val()
    ePColor(colors[colorVal],colorVal)
})
$('#eyeShape').change(()=>{
    var shape = parseInt($('#eyeShape').val())
    eyeVariation(shape)
})
$('#hairshape').change(()=>{
    var shape = parseInt($('#hairshape').val())
    decorationVariation(shape)
    
})
$('#innerHair').change(()=>{
    var colorVal = $('#innerHair').val()
    innerHair(colors[colorVal],colorVal)
})
$('#outerHair').change(()=>{
    var colorVal = $('#outerHair').val()
    outerHair(colors[colorVal],colorVal)
})
$('#animation').change(()=>{
    var animationVal = parseInt($('#animation').val())
    animationVariation(animationVal)
})


//Randomize Function
$('#random').click(()=>{
    var bodycolor = Math.floor(Math.random() * 89) + 10;
    headColor(colors[bodycolor],bodycolor)
    $("#bodycolor").val(bodycolor)

    var mouthColor = Math.floor(Math.random() * 89) + 10;
    mouthBodyTailColor(colors[mouthColor],mouthColor)
    $("#mouthBodyTailColor").val(mouthcolor)

    var pupilColors = Math.floor(Math.random() * 89) + 10;
    eyeColors(colors[pupilColors],pupilColors)
    $("#eyeColor").val(pupilColors)

    var earscolor = Math.floor(Math.random() * 89) + 10;
    earsColor(colors[earscolor],earscolor)
    $("#earscolor").val(earscolor)

    var eyevar = Math.floor(Math.random() * (7 - 1 + 1) + 1);
    eyeVariation(eyevar)
    $("#eyeshape").val(eyevar)

    var decovar = Math.floor(Math.random() * (7 - 1 + 1) + 1);
    decorationVariation(decovar)
    $("#decorationstyle").val(decovar)

    var decMidVar = Math.floor(Math.random() * 89) + 10;
    decorationMidColorVar(colors[decMidVar],decMidVar)
    $("#decMidColor").val(decMidVar)

    var decSideVar = Math.floor(Math.random() * 89) + 10;
    decorationSidesColorVar(colors[decSideVar],decSideVar)
    $("#decSideColor").val(decSideVar)

    var anim = Math.floor(Math.random() * (7 - 1 + 1) + 1);
    animationsPlayer(anim)
    $("#animation").val(anim)
  })
  
//   $('#reset').click(()=>{
  
//     headColor(colors[defaultDNA.headColor],defaultDNA.headColor)
//     $("#bodycolor").val(defaultDNA.headColor)
   
//     mouthColor(colors[defaultDNA.mouthColor],defaultDNA.mouthColor)
//     $("#mouthcolor").val(defaultDNA.mouthColor)
   
//     eyesColor(colors[defaultDNA.eyesColor],defaultDNA.eyesColor)
//     $("#eyescolor").val(defaultDNA.eyesColor)
    
//     earsColor(colors[defaultDNA.earsColor],defaultDNA.earsColor)
//     $("#earscolor").val(defaultDNA.earsColor)
  
//     eyeVariation(defaultDNA.eyesShape)
//     $("#eyeshape").val(defaultDNA.eyesShape)
    
//     decorationVariation(defaultDNA.decorationPattern)
//     $("#decorationstyle").val(defaultDNA.decorationPattern)
  
//     decorationMidColorVar(colors[defaultDNA.decorationMidcolor],defaultDNA.decorationMidcolor)
//     $("#decMidColor").val(defaultDNA.decorationMidcolor)
    
//     decorationSidesColorVar(colors[defaultDNA.decorationSidescolor],defaultDNA.decorationSidescolor)
//     $("#decSideColor").val(defaultDNA.decorationSidescolor)
  
//     animationsPlayer(defaultDNA.animation)
//     $("#animation").val(defaultDNA.animation)
  
    
//   })