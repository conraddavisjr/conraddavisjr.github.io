/**
 * load an obj into the scene
 * @param  {[type]} src   [description]
 * @param  {[type]} scene [description]
 * @return {[type]}       [description]
 */
function getText(
  font,
  fontColor = '0xffffff', 
  copy = "DEFAULT COPY",
  fontSize = .6
) {
  var color = new THREE.Color(`${fontColor}`);
  var material = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide
  });
  var shapes = font.generateShapes(copy, fontSize);
  var geometry = new THREE.ShapeBufferGeometry(shapes);
  var text = new THREE.Mesh(geometry, material);
  
  return text;
  
}

export default getText;