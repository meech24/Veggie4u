import { ScrollView, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity'

const FeaturedRow = ({id, title, description}) => {
  const [restaurants, setRestaurants] = React.useState([]);
  useEffect(()=>{
      sanityClient.fetch(`
      *[_type == "featured" && _id == $id] {
        ...,
        restaurants[]-> {
          ...,
          dishes[]->,
          type->{
            name
          }
        },
      }[0]
      `,{ id }
      )
      .then((data) => {
        setRestaurants(data.restaurants);
      });
  }, [id]);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className='font-extrabold'>{title}</Text>
        <ArrowRightIcon color="#00CC88"/>
      </View>
      <Text className='text-xs text-gray-500 px-4'>{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className='pt-4'
      >
        {/* RestaurantCards... */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            title={restaurant.name}
            imgUrl={restaurant.image}
            rating={restaurant.rating}
            genre={restaurant.type.name}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            address={restaurant.address}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
          
      </ScrollView>
    </View>
  )
}

export default FeaturedRow