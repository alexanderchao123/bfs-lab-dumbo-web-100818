let edges = [
		['14th&6th', '23rd&6th'],
		['23rd&6th', '34th&6th'],
		['34th&6th', '28th&Bwy'],
		['28th&Bwy', '23rd&Bwy'],
		['23rd&Bwy', '14th&Lex'],
		['14th&Lex', '23rd&Lex']
	]

	let vertices = [
	  {name: '34th&6th', distance: null, predecessor: null},
	  {name: '23rd&6th', distance: null, predecessor: null},
		{name: '28th&Bwy', distance: null, predecessor: null},

	  {name: '14th&6th', distance: null, predecessor: null},
	  {name: '23rd&Bwy', distance: null, predecessor: null},
	  {name: '14th&Lex', distance: null, predecessor: null},
	  {name: '23rd&Lex', distance: null, predecessor: null}
	]

function checkVertices(predecessor, node, vertices) {
  for(let i = 0; i < vertices.length; i++) {
    let vertex = vertices[i]
    if (vertex["name"] === node && vertex["name"] !== predecessor && vertex["distance"] === null) {
      return vertex
      }
  }
}

function findAdjacent(node,  vertices, edges) {
  let nodes = []
  for(let i = 0; i < edges.length; i++){
    let currentEdge = edges[i]
    if(currentEdge[0] === node && checkVertices(node, currentEdge[1], vertices)) {
      nodes.push(checkVertices(node, currentEdge[1], vertices))
    } else if(currentEdge[1] === node && checkVertices(node, currentEdge[0], vertices)) {
      nodes.push(checkVertices(node, currentEdge[0], vertices))
    }
  }
  return nodes
}

function markDistanceAndPredecessor(vertex, adjacentNodes) {
  for(let i = 0; i < adjacentNodes.length; i++){
    adjacentNodes[i]["distance"] = vertex["distance"] + 1
    adjacentNodes[i]["predecessor"] = vertex
  }
}

function bfs(rootNode, vertices, edges){
  rootNode["distance"] = 0
  let discovered = [rootNode]
  let discoverOrder = [rootNode]
  while (discovered.length != 0) {
    let currentNode = discovered.shift()
    let adjacentNodes = findAdjacent(currentNode.name, vertices, edges)
    discoverOrder = discoverOrder.concat(adjacentNodes);
    markDistanceAndPredecessor(currentNode, adjacentNodes)
    discovered = discovered.concat(adjacentNodes)
  }
  return discoverOrder
}