var nsdf = {};

var nsdfCommanders = [
  "/pa/units/commanders/nsdf_recycler/nsdf_recycler.json"
 
];

nsdf.builders = _.union(
  nsdfCommanders,
  nsdf.basicFactories,
  nsdf.advFactories,
  nsdf.airFabbers,
  nsdf.landFabbers,
  nsdf.orbitalFabbers,
  nsdf.navalFabbers,
  nsdf.launchers
);

var cca = {};

var ccaCommanders = [
  "/pa/units/commanders/cca_recycler/cca_recycler.json"
]

cca.builders = _.union(
  ccaCommanders,
  cca.basicFactories,
  cca.advFactories,
  cca.airFabbers,
  cca.landFabbers,
  cca.orbitalFabbers,
  cca.navalFabbers,
  cca.launchers
);