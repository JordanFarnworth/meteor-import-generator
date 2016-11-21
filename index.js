"use strict";
exports.importGenerator = function importGenerator(fileName) {
// paths
  var paths = {
    shared_path: 'imports/ui/shared/'
  };
  // must have a COLLECTIONS variable set in common code
  var collections = COLLECTIONS || [];
  // comparison algo, slow but effective
  var compareArrays = function compareArrays(arrayOne, arrayTwo) {
    // are any of the contents from arrayOne in arrayTwo?
    for (var i = 0; i < arrayOne.length; i++) {
      for (var ii = 0; ii < arrayTwo.length; ii++) {
        if (arrayOne[i] === arrayTwo[ii]) {
          return true;
        }
      }
    }
    return false;
  };
  // build paths
  collections.forEach(function (collection) {
    paths[collection + "_collections"] = "/imports/collections/" + collection + "/";
    paths[collection + "_screens"] = "/imports/ui/screens/" + collection + "/";
    paths[collection + "_collection_components"] = "/imports/collections/" + collection + "ui/";
  });
  // determine the file based on the path
  var decryptFile = function (file) {
    var splitName = file.split('.');
    var screen_path_indicators = ['screen'];
    var shared_path_indicators = ['shared'];
    var collection_path_indicators = ['js'];
    if (compareArrays(splitName, shared_path_indicators)) {
      return "shared_path";
    }
    var collection_type = splitName[0].split('_')[0];
    if (splitName.length < 3) {
      return collection_type + "_collection_components";
    }
    if (splitName.length === 3 && splitName[2] === 'js') {
      return collection_type + "_collections";
    }
    if (compareArrays(splitName, screen_path_indicators)) {
      return collection_type + "_screens";
    }
    throw 'filename not recognized';
  };
  // return the require esModul
  return require(paths[decryptFile(fileName)] + fileName);
};
