// App.js
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native';
import ArticleList from './features/screens/articleList/articleList';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView>
        <ArticleList />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;
