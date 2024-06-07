import React from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './articleDetails.style';

interface ArticleDetailsProps {
  author: string;
  content: string;
  publishedAt: string;
  urlToImage: string;
}

const ArticleDetails = ({
  author,
  content,
  publishedAt,
  urlToImage,
}: ArticleDetailsProps) => {
  const dateTime = new Date(publishedAt);

  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const date = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();

  const formattedDate = `${year}-${month}-${date}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{author}</Text>
          <Text>{`${formattedDate} ${formattedTime}`}</Text>
        </View>
        <Text>{content}</Text>
        <Image source={{uri: urlToImage}} style={styles.image} />
      </View>
    </View>
  );
};

export default ArticleDetails;
