import System.IO
import Control.Monad
import Data.Maybe
import Data.List
import Data.Char

names = cycle ["Niko", "Owen", "Sanjana", "Carlo", "Simiran"]
requiredKeys = ["title", "ingredients", "directions"]
junkChars = ['"', ']', '[']

data Recipe = Recipe { title :: String
		     , author :: String
                     , ingredients :: [String]
		     , directions :: [String]
		     , preperationTime :: Int
		     , cookingTime :: Int
		     , difficulty :: Int
		     , favourited :: Bool
		     , likes :: Int
		     } deriving (Show)
		     

main = do
	handle <- openFile "recipes.csv" ReadMode
	contents <- hGetContents handle


	let contentsClean = filter (\x -> x `notElem` junkChars) contents -- remove Junk Characters
	    contents' = ((map (splitList ',') . lines) contentsClean) :: [[String]] -- split file into lines, then lines by commas
	    values = drop 1 contents' -- values are all but first line
	    keys = head contents' -- keys are first line
	    dict = (map (filter (\(k, _) -> k `elem` requiredKeys))) (map (zip keys) values) -- zip togther and remove useless keys
	    recipes = map valueToRecipe dict -- turn tuples into recipes
	    json = toJson recipes


	putStrLn $ json
	-- print $ (length . filter (\(Recipe n _ _) -> "Pie" `isInfixOf` n)) recipes

	hClose handle

toJson :: [Recipe] -> String
toJson recipes = "{ \"recipes\" : [" ++ r ++ "]}"
	where r = (init . unwords) $ map (\x -> (recipeToJson x) ++ ",") recipes

recipeToJson :: Recipe -> String
recipeToJson recipe = "{" ++ (intercalate ", ") values ++ "}"
	where t = "\"name\" : " ++ (show . title) recipe 
	      i = "\"ingredients\" : " ++ (show . ingredients) recipe
	      d = "\"directions\" : " ++ (show . directions) recipe 
	      p = "\"prep_time\" : " ++ (show . preperationTime) recipe
	      c = "\"cooking_time\" : " ++ (show . cookingTime) recipe
	      dif = "\"difficulty\" : " ++ (show . difficulty) recipe
	      fav = "\"favourited\" : " ++ (map (toLower) . show . favourited) recipe 
	      l = "\"likes\" : " ++ (show . likes) recipe
	      a = "\"author\" : " ++ (show . author) recipe
	      values = [t, i, d, p, c, dif, fav, l, a]
{-
recipeToJson :: Recipe -> String
recipeToJson recipe = concat ["{", t, i, d, p, c, dif, fav, l, "}"]
	where t = "\"name\" : " ++ (show . title) recipe ++ ", "
	      i = "\"ingredients\" : " ++ (show . ingredients) recipe ++ ", "
	      d = "\"directions\" : " ++ (show . directions) recipe ++ ", "
	      p = "\"prep_time\" : " ++ (show . preperationTime) recipe ++ ", "
	      c = "\"cooking_time\" : " ++ (show . cookingTime) recipe ++ ", "
	      dif = "\"difficulty\" : " ++ (show . difficulty) recipe ++ ", "
	      fav = "\"favourited\" : " ++ (show . favourited) recipe 
	      l = "\"likes\" : " ++ (show . likes) recipe
-}

valueToRecipe :: [(String, String)] -> Recipe
valueToRecipe value = Recipe { title=title'
                             , ingredients=ingredients'
			     , directions=directions'
			     , preperationTime=preperationTime'
			     , cookingTime=cookingTime'
			     , difficulty=difficulty'
			     , likes=0
			     , favourited=False
			     , author="Ozone"}
	where title' = fromJust $ lookup "title" value
	      ingredients' = (splitList ';' . fromJust . lookup "ingredients") value
	      directions' = (splitList ';' . fromJust . lookup "directions") value
              preperationTime' = length directions'
              cookingTime' = 2 * preperationTime'
	      difficulty' = (mod 10 . product) [(length ingredients'), (length (directions')), preperationTime', cookingTime']

-- | Repeatedly splits a list and collects the results
splitList :: Eq a => a -> [a] -> [[a]]
splitList _   [] = []
splitList sep list = h:splitList sep t
        where (h,t)=split (==sep) list

-- | Split is like break, but the matching element is dropped.
split :: (a -> Bool) -> [a] -> ([a], [a])
split f s = (left,right)
        where
        (left,right')=break f s
        right = if null right' then [] else tail right'
	
