import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

jest.mock('@tanstack/react-query', () => {
  const originalModule = jest.requireActual('@tanstack/react-query');
  return {
    ...originalModule,
    useQuery: jest.fn(),
  };
});

describe('Home Page', () => {
    beforeEach(() => {
        (useQuery as jest.Mock).mockReset(); //сброс моков перед каждым тестом
    });

    it('render loading stste', () => {
        //мокаем useQuery для состояни загрузки
        (useQuery as jest.Mock).mockReturnValue({
            data:undefined,
            isLoading: true,
            error: null,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        );
        expect(screen.getByText('Загрузка...')).toBeInTheDocument();
    });

    it('renders posts list', () => {
    //мок useQuery для успешного получения данных
    const mockPosts = [
      { id: 1, title: 'Первый пост', body: 'Это тело первого поста...' },
      { id: 2, title: 'Второй пост', body: 'Это тело второго поста...' },
    ];
    (useQuery as jest.Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
      error: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(screen.getByText('Посты')).toBeInTheDocument();
    expect(screen.getByText('Первый пост')).toBeInTheDocument();
    expect(screen.getByText('Второй пост')).toBeInTheDocument();
    expect(screen.getByText(/Это тело первого поста/)).toBeInTheDocument();
    expect(screen.getByText(/Это тело второго поста/)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2); //наличие ссылок
  });
})