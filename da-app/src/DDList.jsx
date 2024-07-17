import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Sample data
const initialItems = [
  { id: '1', content: '1. Vivamus in eros ultricies, dignissim ante' },
  { id: '2', content: '2. Vivamus in eros ultricies, dignissim ante' },
  { id: '3', content: '3. Vivamus in eros ultricies, dignissim ante' },
  { id: '4', content: '4. Vivamus in eros ultricies, dignissim ante' },
  { id: '5', content: '5. Vivamus in eros ultricies, dignissim ante' },
  { id: '6', content: '6. Vivamus in eros ultricies, dignissim ante' },
  { id: '7', content: '7. Vivamus in eros ultricies, dignissim ante' },
  { id: '8', content: '8. Vivamus in eros ultricies, dignissim ante' },
];

const DragDropList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    shuffleItems();
  }, []);

  const shuffleItems = () => {
    const shuffledItems = [...initialItems].sort(() => Math.random() - 0.5);
    setItems(shuffledItems);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  const handleCheck = () => {
    const isSorted = items.every((item, index) => item.content.startsWith(`${index + 1}.`));
    alert(isSorted ? "The list is sorted correctly!" : "The list is not sorted correctly.");
  };

  const handleReset = () => {
    shuffleItems();
  };

  const moveItem = (index, direction) => {
    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(index, 1);
    newItems.splice(index + direction, 0, movedItem);
    setItems(newItems);
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      moveItem(index, -1);
    }
  };

  const handleMoveDown = (index) => {
    if (index < items.length - 1) {
      moveItem(index, 1);
    }
  };

  return (
    <div>
      <h2>Component 4 - Ordering</h2>
      <p>Drag and drop to reorder</p>
      <div>
        <button onClick={handleCheck}>Check</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: 'none',
                        padding: '16px',
                        margin: '0 0 8px 0',
                        minHeight: '50px',
                        backgroundColor: '#456C86',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        ...provided.draggableProps.style,
                      }}
                    >
                      <span>{item.content}</span>
                      <div>
                        <button onClick={() => handleMoveUp(index)} style={{ marginRight: '4px' }}>∧</button>
                        <button onClick={() => handleMoveDown(index)}>∨</button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DragDropList;
