import * as React from 'react';
import { useQuery, gql } from "@apollo/client";

const GET_RECIPES = gql`
  query getRecipes {
    recipes{
      title
      isChildFriendly
      ingredients {
        id
        name
      }
    }
  }
`

interface IRecipesIndexProps { }

const Recipes: React.FC<IRecipesIndexProps> = () => {
  const { data, loading, error } = useQuery(GET_RECIPES);

  console.log(data, loading, error);

  return (
    <>{ JSON.stringify(data)}</>
  )
}

export default Recipes;
