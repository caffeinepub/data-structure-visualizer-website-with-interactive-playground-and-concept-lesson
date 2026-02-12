import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, Trash2, Search, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import type { PlaygroundState, PlaygroundAction } from '@/features/playground/models/usePlaygroundState';

interface PlaygroundControlsProps {
  dataStructure: string;
  state: PlaygroundState;
  dispatch: (action: PlaygroundAction) => void;
}

export function PlaygroundControls({ dataStructure, state, dispatch }: PlaygroundControlsProps) {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleInsert = () => {
    if (!inputValue.trim()) return;
    dispatch({ type: 'INSERT', value: inputValue });
    setInputValue('');
  };

  const handleDelete = () => {
    if (!inputValue.trim()) return;
    dispatch({ type: 'DELETE', value: inputValue });
    setInputValue('');
  };

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    dispatch({ type: 'SEARCH', value: searchValue });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    setInputValue('');
    setSearchValue('');
  };

  const getOperationLabel = () => {
    switch (dataStructure) {
      case 'stack':
        return { insert: 'Push', delete: 'Pop' };
      case 'queue':
        return { insert: 'Enqueue', delete: 'Dequeue' };
      default:
        return { insert: 'Insert', delete: 'Delete' };
    }
  };

  const labels = getOperationLabel();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Operations</CardTitle>
        <CardDescription>Manipulate the data structure</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="value-input">Value</Label>
          <div className="flex gap-2">
            <Input
              id="value-input"
              type="text"
              placeholder="Enter value..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleInsert} className="flex-1 gap-2" disabled={!inputValue.trim()}>
                  <Plus className="h-4 w-4" />
                  {labels.insert}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add a new element</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {dataStructure !== 'stack' && dataStructure !== 'queue' && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleDelete}
                    variant="destructive"
                    className="flex-1 gap-2"
                    disabled={!inputValue.trim()}
                  >
                    <Trash2 className="h-4 w-4" />
                    {labels.delete}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove an element</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {(dataStructure === 'stack' || dataStructure === 'queue') && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => dispatch({ type: 'POP' })} variant="destructive" className="flex-1 gap-2">
                    <Trash2 className="h-4 w-4" />
                    {labels.delete}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove from {dataStructure === 'stack' ? 'top' : 'front'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {dataStructure !== 'stack' && dataStructure !== 'queue' && (
          <>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="search-input">Search</Label>
              <div className="flex gap-2">
                <Input
                  id="search-input"
                  type="text"
                  placeholder="Search value..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={handleSearch} variant="outline" size="icon" disabled={!searchValue.trim()}>
                        <Search className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Find element</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </>
        )}

        <Separator />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleReset} variant="outline" className="w-full gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear all elements</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
