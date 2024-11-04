model.biomes.push('bz_luna')
model.biomes.push('bz_ice')
model.biomes.push('bz_lava')


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
            metalDensity: 2,
            metalClusters: 5,
            biome: "bz_luna",
            biomeScale: 50,
        },
    },
    {
        name: "ice template",
        mass: 20000,
        required_thrust_to_move: 0,
        planet: {
            seed: 1005221888,
            radius: 800,
            heightRange: 35,
            waterHeight: 25,
            waterDepth: 0,
            temperature: 0,
            metalDensity: 3,
            metalClusters: 5,
            biome: "bz_ice",
            biomeScale: 50,
        },
    },
    {
        name: "lava template",
        mass: 20000,
        required_thrust_to_move: 0,
        planet: {
            seed: 809037056,
            radius: 700,
            heightRange: 50,
            waterHeight: 65,
            waterDepth: 85,
            temperature: 50,
            metalDensity: 5,
            metalClusters: 30,
            biome: "bz_lava",
            biomeScale: 50,
        },
    },
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