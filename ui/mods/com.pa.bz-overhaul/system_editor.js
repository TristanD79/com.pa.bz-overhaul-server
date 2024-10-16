model.biomes.push('bz_luna')


var bztemplates = [
    {
        name: "luna template",
        mass: 20000,
        required_thrust_to_move: 0,
        planet: {
            seed: 574190272,
            radius: 800,
            heightRange: 25,
            waterHeight: 65,
            waterDepth: 10,
            temperature: 65,
            metalDensity: 50,
            metalClusters: 50,
            biome: "bz_luna",
            biomeScale: 50,
        },
    }
];

var extraTemplates = ko.observableArray([])
extraTemplates().concat(bztemplates)



model.buildBarDisplayItems = ko.computed(function () {
    var extraTemplatesTemp = extraTemplates()
    if(extraTemplatesTemp.length>0 && model.buildBarSelectedMode() == "templates"){
        var newTemplates = model.defaultTemplates().concat(extraTemplatesTemp)
        model.buildBarDisplayList(newTemplates)
    }
    var start =
      model.buildBarPage() * model.buildbarPageSize() +
      model.buildBarPageOffset();
    var end = start + model.buildbarPageSize();
    return model.buildBarDisplayList.slice(start, end);
  });

_.delay(function(){
   extraTemplates(extraTemplates().concat(bztemplates))
},1000);