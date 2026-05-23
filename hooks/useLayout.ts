import { useState, useEffect, useRef } from 'react';

export function useLayout() {
  const [editorWidth, setEditorWidth] = useState(33.33); // Percentage
  const [watchWindowWidth, setWatchWindowWidth] = useState(320); // Pixels
  const [codeEditorHeight, setCodeEditorHeight] = useState(50); // Percentage of Left Column
  const [inputWidth, setInputWidth] = useState(50); // Percentage of IO Panel

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isIOCollapsed, setIsIOCollapsed] = useState(false);
  const [isWatchCollapsed, setIsWatchCollapsed] = useState(false);
  const [isLeftColumnCollapsed, setIsLeftColumnCollapsed] = useState(false);

  const [isResizingEditor, setIsResizingEditor] = useState(false);
  const [isResizingWatch, setIsResizingWatch] = useState(false);
  const [isResizingCodeHeight, setIsResizingCodeHeight] = useState(false);
  const [isResizingInputWidth, setIsResizingInputWidth] = useState(false);

  const prevEditorWidth = useRef(33.33);
  const prevWatchWidth = useRef(320);
  const prevLeftColumnWidth = useRef(33.33);

  const toggleSidebar = () => {
    if (!isSidebarCollapsed) {
      prevEditorWidth.current = editorWidth;
      setEditorWidth(0);
    } else {
      setEditorWidth(prevEditorWidth.current);
    }
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleWatchWindow = () => {
    if (!isWatchCollapsed) {
      prevWatchWidth.current = watchWindowWidth;
    }
    setIsWatchCollapsed(!isWatchCollapsed);
  };

  const toggleIOHandler = () => {
    setIsIOCollapsed(!isIOCollapsed);
  };

  const toggleLeftColumn = () => {
    if (!isLeftColumnCollapsed) {
      prevLeftColumnWidth.current = editorWidth;
      setEditorWidth(0);
    } else {
      setEditorWidth(prevLeftColumnWidth.current);
    }
    setIsLeftColumnCollapsed(!isLeftColumnCollapsed);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingEditor) {
        const newWidth = (e.clientX / window.innerWidth) * 100;
        if (newWidth > 10 && newWidth < 80) setEditorWidth(newWidth);
      }
      if (isResizingWatch) {
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth > 100 && newWidth < 600) setWatchWindowWidth(newWidth);
      }
      if (isResizingCodeHeight) {
        const container = document.getElementById('left-column-container');
        if (container) {
          const rect = container.getBoundingClientRect();
          const newHeight = ((e.clientY - rect.top) / rect.height) * 100;
          if (newHeight > 20 && newHeight < 80) setCodeEditorHeight(newHeight);
        }
      }
      if (isResizingInputWidth) {
        const container = document.getElementById('io-panel-container');
        if (container) {
          const rect = container.getBoundingClientRect();
          const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
          if (newWidth > 20 && newWidth < 80) setInputWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizingEditor(false);
      setIsResizingWatch(false);
      setIsResizingCodeHeight(false);
      setIsResizingInputWidth(false);
    };

    if (isResizingEditor || isResizingWatch || isResizingCodeHeight || isResizingInputWidth) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingEditor, isResizingWatch, isResizingCodeHeight, isResizingInputWidth]);

  return {
    editorWidth, setEditorWidth,
    watchWindowWidth, setWatchWindowWidth,
    codeEditorHeight, setCodeEditorHeight,
    inputWidth, setInputWidth,
    isSidebarCollapsed, toggleSidebar,
    isIOCollapsed, toggleIO: toggleIOHandler,
    isWatchCollapsed, toggleWatchWindow,
    isLeftColumnCollapsed, toggleLeftColumn,
    setIsResizingEditor,
    setIsResizingWatch,
    setIsResizingCodeHeight,
    setIsResizingInputWidth
  };
} 
