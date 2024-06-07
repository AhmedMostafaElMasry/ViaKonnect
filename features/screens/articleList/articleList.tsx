import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {ArticleListTypes} from './articleListTypes';
import config from '../../../config';
import ArticleDetails from '../../components/articleDetails/articalsDetails';

const ArticleList = () => {
  const fetchNews = async (): Promise<ArticleListTypes> => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=tesla&from=2024-05-07&sortBy=publishedAt&apiKey=${config.NEWS_API_KEY}`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const {data, error, isLoading} = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  });

  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  const handleArticlePress = (index: number) => {
    setOpenItemIndex(index === openItemIndex ? null : index);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      <FlatList
        data={data?.articles || []}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => handleArticlePress(index)}>
            <View style={{padding: 10}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {item.title}
              </Text>
              <Text>{item.description}</Text>
              {openItemIndex === index && (
                <ArticleDetails
                  author={item.author}
                  content={item.content}
                  publishedAt={item.publishedAt}
                  urlToImage={item.urlToImage}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ArticleList;
