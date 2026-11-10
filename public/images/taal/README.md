# Taal page photos

Drop photos here with these exact file names. The pages pick them up
automatically; until a file exists, a labelled placeholder is shown.
Use JPG or WebP (if WebP, update the paths in src/data/taal.ts).

| File                        | Where                                  | Size (px)   | Shape |
| --------------------------- | -------------------------------------- | ----------- | ----- |
| hero-about.webp             | About page banner                      | 2400 x 1000 | 12:5  |
| hero-history.webp           | History page banner                    | 2400 x 1000 | 12:5  |
| hero-culture.jpg            | Culture page banner                    | 2400 x 1000 | 12:5  |
| hero-barangays.jpg          | Barangays page banner                  | 2400 x 1000 | 12:5  |
| history-2020.jpg            | Timeline: Taal Volcano eruption        | 1800 x 750  | 12:5  |
| history-1898.jpg            | Timeline: Marcela Agoncillo            | 1800 x 750  | 12:5  |
| history-1754.jpg            | Timeline: the great eruption           | 1800 x 750  | 12:5  |
| history-1732.jpg            | Timeline: capital of Batangas          | 1800 x 750  | 12:5  |
| history-1572.webp           | Timeline: founding of Taal             | 1800 x 750  | 12:5  |
| culture-barong-burda.jpg    | Culture: Barong and Burdang Taal       | 1800 x 750  | 12:5  |
| culture-balisong.jpg        | Culture: Balisong                      | 1800 x 750  | 12:5  |
| culture-cuisine.jpg         | Culture: Cuisine                       | 1800 x 750  | 12:5  |
| culture-festivals.jpg       | Culture: Festivals                     | 1800 x 750  | 12:5  |
| culture-heritage-houses.jpg | Culture: Churches and ancestral houses | 1800 x 750  | 12:5  |

Keep banners under about 400 KB and the others under about 250 KB.
Only use photos you took, have permission for, or that carry a license
allowing reuse (and credit the photographer where required).

The same photo is cropped differently by screen size, so keep the main
subject in the middle of the frame with some space around it:
banners show as a wide strip on desktop and nearly square on phones,
and timeline photos go from about 3:1 on large screens to 1:1 on phones.

## Photo credits

Photos under a Creative Commons license need a credit on the page. Add
it in `src/data/taal.ts`: banners use the `credit` in HERO_PHOTOS, and
timeline/culture photos use PHOTO_CREDITS (keyed by file path). The
credit then shows on the page automatically.

| File              | Photo                                                                                                                                                                   | Author                              | License                                                         | Changes                            |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------- | ---------------------------------- |
| hero-about.webp   | [Taal Municipal Building (side view)](<https://commons.wikimedia.org/wiki/File:Taal_Municipal_Building_(side_view)_(Taal,_Batangas)(2018-07-30).jpg>)                   | Patrick Roque (patrickroque01)      | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Cropped to 2400 x 1000, compressed |
| history-1572.webp | [Minor Basilica of Saint Martin of Tours (Taal Basilica)](https://commons.wikimedia.org/wiki/File:Minor_Basilica_of_Saint_Martin_of_Tours_or_Taal_Basilica_85M7766.jpg) | ImaheNiNiño1989                     | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Cropped to 1800 x 750, compressed  |
| hero-history.webp | [Taal town proper - old houses side](<https://commons.wikimedia.org/wiki/File:Taal_town_proper_-_old_houses_side_(Taal,_Batangas)(2018-07-30).jpg>)                     | Patrickroque01 at English Wikipedia | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Cropped to 2400 x 1000, compressed |
