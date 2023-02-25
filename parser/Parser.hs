import System.IO
import Control.Monad
import Data.Maybe

name = cycle ["Niko", "Owen", "Sanjana", "Carlo", "Simiran"]
requiredKeys = ["title", "ingredients", "directions"]
junkChars = ['"', ']', '[']

data Recipe = Recipe { title :: String
                     , ingredients :: [String]
		     , directions :: [String]
		     } deriving (Show)
		     

main = do
	handle <- openFile "recipes.csv" ReadMode
	contents <- hGetContents handle


	let contentsClean = filter (\x -> x `notElem` junkChars) contents
	    contents' = ((map (splitList ',') . lines) contentsClean) :: [[String]]
	    values = drop 1 contents'
	    keys = head contents'
	    dict = (map (filter (\(k, _) -> k `elem` requiredKeys))) (map (zip keys) values)
	    recipes = map valueToRecipe dict
	    json = toJson recipes


	putStrLn $ json
	-- putStrLn $ head (map recipeToJson out)

	hClose handle

toJson :: [Recipe] -> String
toJson recipes = "{ \"recipes\" : [" ++ r ++ "]}"
	where r = (init . unwords) $ map (\x -> (recipeToJson x) ++ ",") recipes

recipeToJson :: Recipe -> String
recipeToJson recipe = "{" ++ t ++ i ++ d ++ "}"
	where t = "\"title\" : " ++ (show . title) recipe ++ ","
	      i = "\"ingredients\" : " ++ (show . ingredients) recipe ++ ","
	      d = "\"directions\" : " ++ (show . directions) recipe


valueToRecipe :: [(String, String)] -> Recipe
valueToRecipe value = Recipe {title=title', ingredients=ingredients', directions=directions'}
	where title' = fromJust $ lookup "title" value
	      ingredients' = (splitList ';' . fromJust . lookup "ingredients") value
	      directions' = (splitList ';' . fromJust . lookup "directions") value

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
	
