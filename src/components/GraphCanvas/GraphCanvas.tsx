import React, { ReactElement, useRef } from 'react';
import Container from './Container';
import GraphNode from '../GraphNode/GraphNode';
import NodeLink from '../NodeLink/NodeLink';
interface Props {
  adjacencyList: Array<Array<number>>;
  visited: Array<number>;
}



const GraphCanvas: React.FC<Props> = (props: Props): ReactElement => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const adjacencyList = props.adjacencyList;
  const visited = props.visited;
  const nodeRefs = adjacencyList.map(_ => React.createRef<HTMLSpanElement>());
  const reducedEdges: Map<number, Array<number>> = new Map();
  const connectedNodePairs: Array<Array<number>> = [];

  adjacencyList.forEach((adjacentNodes: Array<number>, currentNode: number) => {
    const currentNodeEdges: Array<number> = [];
    adjacentNodes.forEach((adjacentNode: number) => {
      if (!reducedEdges.get(adjacentNode)?.includes(currentNode))
        currentNodeEdges.push(adjacentNode);
    });
    if (currentNodeEdges.length !== 0) {
      reducedEdges.set(currentNode, currentNodeEdges);
    }
  });

  reducedEdges.forEach((adjacentNodes: Array<number>, node: number) => {
    adjacentNodes.forEach((adjacentNode: number) => {
      connectedNodePairs.push([node, adjacentNode])
    })
  })


  return (
    <Container ref={canvasRef}>
      {adjacencyList.map((val: Array<number>, index: number) => {
        return (

          <GraphNode
            key={index}
            canvasRef={canvasRef}
            isActive={visited.includes(index)}
            content={(index + 1).toString()}
            edgeRef={nodeRefs[index]}
          >
            <span
              ref={nodeRefs[index]}></span>
          </GraphNode>

        );
      })}
      {
        connectedNodePairs.map(([n1, n2]: Array<number>, index: number) => {
          return <NodeLink n1={nodeRefs[n2]} n2={nodeRefs[n1]} key={1000 + index} />
        })
      }
    </Container>
  );
};

export default GraphCanvas;
