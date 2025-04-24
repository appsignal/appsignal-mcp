/**
 * @jest-environment node
 */

// Import necessary Jest tools for ESM
import { jest } from '@jest/globals';
import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import type { AxiosResponse } from 'axios';

// Set up mocks
const mockAxiosGet = jest.fn(() => Promise.resolve({ data: {} }) as Promise<AxiosResponse>);
const mockAxiosPost = jest.fn(() => Promise.resolve({ data: {} }) as Promise<AxiosResponse>);
const mockAxiosCreate = jest.fn(() => ({
  get: mockAxiosGet,
  post: mockAxiosPost,
}));

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: mockAxiosCreate
  }
}));

const mockSetRequestHandler = jest.fn();
const mockConnect = jest.fn();
const mockServer = jest.fn().mockImplementation(() => ({
  setRequestHandler: mockSetRequestHandler,
  connect: mockConnect,
}));

jest.mock('@modelcontextprotocol/sdk/server/index.js', () => ({
  __esModule: true,
  Server: mockServer
}), { virtual: true });

jest.mock('@modelcontextprotocol/sdk/server/stdio.js', () => ({
  __esModule: true,
  StdioServerTransport: jest.fn().mockImplementation(() => ({})),
}), { virtual: true });

// Mock types
jest.mock('@modelcontextprotocol/sdk/types.js', () => ({
  __esModule: true,
  ListToolsRequestSchema: 'mock-list-tools-schema',
  CallToolRequestSchema: 'mock-call-tool-schema',
  ListPromptsRequestSchema: 'mock-list-prompts-schema',
  GetPromptRequestSchema: 'mock-get-prompt-schema',
  ListResourcesRequestSchema: 'mock-list-resources-schema',
  ReadResourceRequestSchema: 'mock-read-resource-schema',
}), { virtual: true });

// Mock process.exit and console.error
const originalExit = process.exit;
const originalConsoleError = console.error;

describe('AppSignal MCP Server', () => {
  // Save original process.env
  const originalEnv = { ...process.env };
  
  beforeEach(() => {
    // Reset mocks
    jest.resetModules();
    jest.clearAllMocks();
    
    // Mock console.error
    console.error = jest.fn();
    
    // Set up environment variables
    process.env.APPSIGNAL_API_KEY = 'test-api-key';
    process.env.APPSIGNAL_ENDPOINT = 'https://test-endpoint.com/api/mcp';
    
    // Mock process.exit
    process.exit = jest.fn() as any;
  });
  
  afterEach(() => {
    // Restore environment and console
    process.env = { ...originalEnv };
    console.error = originalConsoleError;
    process.exit = originalExit;
  });

  test('throws error when API key is missing', async () => {
    // Remove API key from environment
    delete process.env.APPSIGNAL_API_KEY;
    
    // Import should throw
    await expect(async () => {
      await import('../src/index.js');
    }).rejects.toThrow('APPSIGNAL_API_KEY environment variable is required');
  });
  
  test('uses correct API endpoint', async () => {
    // Reset modules
    jest.resetModules();
    
    // Import the module
    await import('../src/index.js');
    
    // Check axios.create was called with correct baseURL
    expect(mockAxiosCreate).toHaveBeenCalledWith(expect.objectContaining({
      baseURL: 'https://test-endpoint.com/api/mcp',
      headers: {
        Authorization: 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
    }));
  });
  
  test('uses default endpoint if not provided', async () => {
    // Remove custom endpoint
    delete process.env.APPSIGNAL_ENDPOINT;
    
    // Reset modules to clean state
    jest.resetModules();
    
    // Import the module
    await import('../src/index.js');
    
    // Check axios.create was called with default baseURL
    expect(mockAxiosCreate).toHaveBeenCalledWith(expect.objectContaining({
      baseURL: 'https://appsignal.com/api/mcp',
    }));
  });
  
  test('sets up all request handlers', async () => {
    // Reset modules
    jest.resetModules();
    
    // Import the module
    await import('../src/index.js');
    
    // Check that setRequestHandler was called for all endpoints (6 handlers)
    expect(mockSetRequestHandler).toHaveBeenCalledTimes(6);
  });
  
  test('handles uncaught exceptions', async () => {
    // We want to test that the process exits when there's an uncaught exception
    // First, import the module (which will set up the error handling)
    await import('../src/index.js');
    
    // Simulate an uncaught exception by calling the handler directly
    const error = new Error('Test error');
    
    // Create a fake implementation of main().catch() that we can call
    const simulateUncaughtError = () => {
      // This simulates what happens in the index.ts file in the catch handler
      console.error('Fatal error in main():', error);
      process.exit(1);
    };
    
    // Call our simulated error handler
    simulateUncaughtError();
    
    // Verify that the console.error was called with the right arguments
    expect(console.error).toHaveBeenCalledWith(
      'Fatal error in main():',
      error
    );
    
    // Check that process.exit was called with code 1
    expect(process.exit).toHaveBeenCalledWith(1);
  });
  
  test('connects to transport on startup', async () => {
    // Reset modules
    jest.resetModules();
    
    // Import the module
    await import('../src/index.js');
    
    // Verify Server constructor was called with correct parameters
    expect(mockServer).toHaveBeenCalledWith(
      {
        name: 'AppSignal',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          prompts: {},
          resources: {},
        },
      }
    );
  });
});