from app.models import db, environment, SCHEMA
from app.models.item import Item, CategoryType, ConditionType, SizeType, ItemStatusType
from random import choice

def generate_items():
    categories = {
        "FOOTBALL": CategoryType.FOOTBALL,
        "SOCCER": CategoryType.SOCCER,
        "BASEBALL": CategoryType.BASEBALL,
        "BASKETBALL": CategoryType.BASKETBALL
    }
    
    conditions = [ConditionType.NEW, ConditionType.USED]
    users = [1, 2, 3, 4, 5]
    sizes = [SizeType.S, SizeType.M, SizeType.L, SizeType.XL]

    item_data = [
        # FOOTBALL (NFL)
        ("Kansas City Chiefs", "Super Bowl LVIII official jersey", 150, "https://fanatics.frgimages.com/kansas-city-chiefs/mens-nike-patrick-mahomes-red-kansas-city-chiefs-super-bowl-lviii-game-jersey_ss5_p-201164792+u-g3ejsm3i2qfzw1ibvfhz+v-rwgk0t3vsiy8uswwwyo9.jpg?_hv=2", categories["FOOTBALL"]),
        ("Manchester United", "2025 home jersey - classic red design", 130, "https://fanatics.frgimages.com/manchester-united/mens-adidas-red-manchester-united-2024/25-home-authentic-custom-long-sleeve-jersey_ss5_p-201534429+u-bwuyhqrvkk32eewydp5s+v-n3anmex2puqppow6q0mf.jpg?_hv=2", categories["SOCCER"]),
        ("New York Yankees", "Classic Yankees baseball jersey", 100, "https://fanatics.frgimages.com/new-york-yankees/mens-nike-white-new-york-yankees-home-replica-team-jersey_pi3588000_altimages_ff_3588519-d71169ae95218eca7de9alt1_full.jpg?_hv=2&w=900", categories["BASEBALL"]),
        ("Los Angeles Lakers", "LeBron James #23 2024-25 season jersey", 120, "https://fagaz.com/wp-content/uploads/2025/02/25-swingman-player-jersey-city-edition_ss5_p-201347246pv-1u-hm0vzm3zujgjclnan5htv-lvepaiao6eq7reosojkl.jpg", categories["BASKETBALL"]),
        ("Dallas Cowboys", "Classic blue Cowboys jersey", 130, "https://fanatics.frgimages.com/dallas-cowboys/mens-mitchell-and-ness-emmitt-smith-navy-dallas-cowboys-legacy-replica-jersey_ss5_p-4996888+pv-1+u-vyv9punodzptaswemysb+v-uzm7els3zijtkzaufiax.jpg?_hv=2&w=900", categories["FOOTBALL"]),
        ("FC Barcelona", "2025 home jersey with iconic blue and red stripes", 135, "https://jerseyteamsworld.com/cdn/shop/files/LamineYamalBarcelonaNike202425HomePlayerJersey-Royal_3_600x.jpg?v=1724941152", categories["SOCCER"]),
        ("Boston Red Sox", "Authentic Red Sox baseball jersey", 90, "https://fanatics.frgimages.com/boston-red-sox/mens-nike-jarren-duran-white-boston-red-sox-home-replica-player-jersey_ss5_p-202156195+pv-1+u-0gykxssn6jdv51aqse5z+v-wukx7bjpxzjdfqcutaun.jpg?_hv=2&w=900", categories["BASEBALL"]),
        ("Milwaukee Bucks", "Giannis Antetokounmpo official jersey", 130, "https://fanatics.frgimages.com/milwaukee-bucks/mens-fanatics-giannis-antetokounmpo-hunter-green-milwaukee-bucks-fast-break-replica-player-jersey-icon-edition_ss5_p-201451087+pv-1+u-suaeiofp4anttlygw9bd+v-zbygf3p3dcdwvauple56.jpg?_hv=2&w=900", categories["BASKETBALL"]),
        ("Green Bay Packers", "Aaron Rodgers throwback jersey", 140, "https://img.thesitebase.net/10611/10611866/products/ver_1/gexdgmjvgezdmmjvgCBtkmzxgexdambqgaxdiobvgqCtomjqhextmnzyhaCtaoa.png?width=3840&height=0&min_height=0", categories["FOOTBALL"]),
        ("Real Madrid", "2025 third kit - dark blue special edition", 140, "https://footdealer.co/wp-content/uploads/2024/08/Maillot-Real-Madrid-Third-2024-2025-Mbappe.jpg", categories["SOCCER"]),
        ("San Francisco Giants", "Official Giants baseball jersey", 95, "https://fanatics.frgimages.com/san-francisco-giants/mens-nike-cream-san-francisco-giants-home-replica-team-jersey_pi3588000_altimages_ff_3588480-a9a1ed5ae8b0bcaf9ab4alt1_full.jpg?_hv=2&w=900", categories["BASEBALL"]),
        ("Golden State Warriors", "Steph Curry edition jersey", 115, "https://fanatics.frgimages.com/golden-state-warriors/unisex-nike-stephen-curry-royal-golden-state-warriors-swingman-jersey-icon-edition_pi4650000_altimages_ff_4650408-bce9200a988d4fe31b0dalt1_full.jpg?_hv=2&w=900", categories["BASKETBALL"]),
        ("New England Patriots", "Patriots home jersey - Navy blue", 125, "https://images.footballfanatics.com/new-england-patriots/new-england-patriots-nike-game-home-jersey-navy-hunter-henry-mens_ss4_p-12094936+u-70xjxqvpbcemafflxify+v-34e59f129d274fad9e2c22e102f31fd5.jpg?_hv=2", categories["FOOTBALL"]),
        ("Liverpool FC", "2025 away jersey - sleek white design", 125, "https://ogasports.com/wp-content/uploads/2024/11/liverpool-202425-third-men-jersey--white-qemmd.jpeg", categories["SOCCER"]),
        ("Philadelphia Phillies", "Classic Phillies baseball jersey", 100, "https://cdn.shopify.com/s/files/1/0654/1990/3218/products/PhiladelphiaPhilliesNikeWhiteHomeBlankReplicaJersey.jpg?v=1677676058&width=1500", categories["BASEBALL"]),
        ("Boston Celtics", "Classic green Celtics jersey - 2024 season", 110, "https://dks.scene7.com/is/image/GolfGalaxy/22NIKMNBCLTCSGRNTBOS?wid=2000&fmt=pjpeg", categories["BASKETBALL"]),
        ("Chicago Bears", "Bears classic orange alternate jersey", 115, "https://fanatics.frgimages.com/chicago-bears/mens-nike-walter-payton-orange-chicago-bears-retired-player-jersey_pi4268000_altimages_ff_4268247-123d79d6d3926e8e5162alt1_full.jpg?_hv=2&w=900", categories["FOOTBALL"]),
        ("Juventus FC", "2025 home jersey - classic black and white", 140, "https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/a/9a962989f48d5f51c4a30843cb9d9b3a9b22775d8d70c21584c502d74df1cc18.jpeg", categories["SOCCER"]),
        ("Los Angeles Dodgers", "Dodgers home jersey", 105, "https://cdn.shopify.com/s/files/1/0654/1990/3218/products/LosAngelesDodgersMookieBettsNikeWhiteHomeAuthenticPlayerJersey.jpg?v=1677675673&width=1500", categories["BASEBALL"]),
        ("Phoenix Suns", "Devin Booker Valley jersey", 130, "https://images.footballfanatics.com/phoenix-suns/mens-nike-devin-booker-black-phoenix-suns-2021/22-swingman-player-jersey-city-edition_pi3852000_altimages_ff_3852627-84f0c152521b4febfba9alt1_full.jpg?_hv=2&w=900", categories["BASKETBALL"]),
        ("San Francisco 49ers", "49ers red and gold jersey", 135, "https://sc04.alicdn.com/kf/H2ecf493959f94b0487254de6a19e1f31P.jpg", categories["FOOTBALL"]),
        ("Tottenham Hotspur", "2025 home jersey - white and navy", 130, "https://fanatics.frgimages.com/tottenham-hotspur/mens-nike-white-tottenham-hotspur-2024/25-home-replica-jersey_ss5_p-201541670+pv-1+u-d0dnga3pgwygtjbmublw+v-cziiuwh81pbbep7fcgpv.jpg?_hv=2&w=900", categories["SOCCER"]),
        ("Chicago Cubs", "Cubs classic pinstripe jersey", 98, "https://cdn.shopify.com/s/files/1/0654/1990/3218/products/ChicagoCubsBig_TallHomeReplicaTeamJersey-WhiteRoyal.jpg?v=1684420909&width=1500", categories["BASEBALL"]),
        ("Miami Heat", "Dwyane Wade Miami Vice jersey", 140, "https://fanatics.frgimages.com/miami-heat/mens-nike-dwyane-wade-black-miami-heat-city-edition-swingman-jersey_pi3077000_altimages_ff_3077724-ef7478157d7de2beb79balt1_full.jpg?_hv=2&w=900", categories["BASKETBALL"]),
        ("Baltimore Ravens", "Lamar Jackson edition jersey", 140, "https://fanatics.frgimages.com/baltimore-ravens/mens-nike-lamar-jackson-white-baltimore-ravens-game-jersey_pi4555000_ff_4555966-c98d7f0b1d030b8728b0_full.jpg?_hv=2", categories["FOOTBALL"]),
        ("AC Milan", "2025 home jersey - black and red stripes", 135, "https://images.footballfanatics.com/ac-milan/mens-puma-rafael-le%C3%A3o-red-ac-milan-2024/25-home-authentic-player-jersey_ss5_p-201639772+pv-1+u-gfqxg1e4gfpzxoribs5l+v-dzlvhhoveohgzteiqovc.jpg?_hv=2&w=900", categories["SOCCER"]),
        ("St. Louis Cardinals", "Cardinals home jersey", 102, "https://fanatics.frgimages.com/st-louis-cardinals/mens-nike-white-st-louis-cardinals-home-replica-team-jersey_pi3588000_altimages_ff_3588560-677f033ae95fb93cea16alt1_full.jpg?_hv=2&w=900", categories["BASEBALL"]),
        ("Denver Nuggets", "Nikola Jokic MVP edition jersey", 135, "https://fanatics.frgimages.com/denver-nuggets/mens-nike-nikola-jokic-navy-denver-nuggets-authentic-jersey-icon-edition_ss5_p-3773280+pv-1+u-avw1xqmypil7hzwmdtav+v-x14qtmonvhuwlyiknr66.jpg?_hv=2&w=900", categories["BASKETBALL"]),
        ("Miami Dolphins", "Dolphins teal home jersey", 110, "https://fanatics.frgimages.com/miami-dolphins/mens-nike-kadar-hollman-aqua-miami-dolphins-home-game-player-jersey_pi5288000_ff_5288941-3b11417c8b80d240f581_full.jpg?_hv=2", categories["FOOTBALL"]),
        ("Bayern Munich", "2025 home jersey - classic red and white", 130, "https://cdn03.ciceksepeti.com/cicek/kcm90209919-1/XL/bayern-munih-2023-2024-yeni-sezon-yetiskintaraftar-futbol-formasi-sacha-boey-23-kcm90209919-1-a869949df7424f01b20457e768f4aafd.jpg", categories["SOCCER"]),
        ("Atlanta Braves", "2024 Braves baseball jersey", 95, "https://fanatics.frgimages.com/atlanta-braves/mens-nike-ronald-acuna-jr-white-atlanta-braves-home-replica-player-name-jersey_pi3592000_altimages_ff_3592490-dd5738a67823c44047cbalt1_full.jpg?_hv=2&w=900", categories["BASEBALL"]),
        ("Chicago Bulls", "Michael Jordan throwback jersey", 150, "https://fanatics.frgimages.com/chicago-bulls/mens-mitchell-and-ness-michael-jordan-scarlet-chicago-bulls-1997/98-hardwood-classics-authentic-jersey_pi3902000_altimages_ff_3902287-1c1317b0ddf7fbe59314alt1_full.jpg?_hv=2&w=900", categories["BASKETBALL"]),
        ("Arsenal FC", "2025 home jersey - red and white classic", 135, "https://ogasports.com/wp-content/uploads/2024/12/arsenal-2024-25-home-jersey--red-cohjh.jpeg", categories["SOCCER"]),
        ("New York Mets", "Mets blue alternate jersey", 97, "https://fanatics.frgimages.com/new-york-mets/mens-nike-juan-soto-royal-new-york-mets-replica-player-jersey_ss5_p-202675717+pv-1+u-ifmxo79akknnmnzpbqe0+v-gnlkrl6fjxh4xdggy1am.jpg?_hv=2&w=900", categories["BASEBALL"]),
        ("Brooklyn Nets", "Kevin Durant edition black and white jersey", 125, "https://fanatics.frgimages.com/brooklyn-nets/mens-fanatics-kevin-durant-black-brooklyn-nets-fast-break-replica-jersey-icon-edition_ss5_p-4911356+pv-1+u-ohkjerwx9ydtkcqn73ad+v-xbrebfl2bx61mzvn4id2.jpg?_hv=2&w=900", categories["BASKETBALL"]),
        ("Seattle Seahawks", "Seahawks neon green alternate jersey", 120, "https://fanatics.frgimages.com/seattle-seahawks/mens-nike-dk-metcalf-neon-green-seattle-seahawks-alternate-vapor-elite-player-jersey_pi4131000_ff_4131778-3ca67a7020b6a0c4eeb3_full.jpg?_hv=2", categories["FOOTBALL"]),
        ("Inter Milan", "2025 away jersey - white with blue accents", 125, "https://footsoccerpro.co/wp-content/uploads/2024/08/Maillot-Inter-Milan-Exterieur-2024-2025-Thuram.jpg", categories["SOCCER"]),
        ("New York Knicks", "2025 home jersey - orange and blue", 125, "https://kodysports.com/wp-content/uploads/2024/04/kodysports-high-quality-nba-jalen-brunson-new-york-knicks-2023-24-city-edition-fan-game-jersey-ryll8.jpg", categories["BASKETBALL"]),
        ("Pittsburgh Steelers", "Steelers black and yellow jersey", 130, "https://fanatics.frgimages.com/pittsburgh-steelers/mens-nike-tj-watt-black-pittsburgh-steelers-alternate-game-jersey_ss5_p-201067094+pv-1+u-sqjty93yewcsheojwwlu+v-s6kspvoeobebktqhqd1q.jpg?_hv=2&w=900", categories["FOOTBALL"]),
        ("Houston Astros", "Official Astros baseball jersey", 110, "https://fanatics.frgimages.com/houston-astros/mens-nike-jose-altuve-orange-houston-astros-alternate-replica-player-name-jersey_pi3592000_altimages_ff_3592586-2875657a5e6fbaf078e1alt1_full.jpg?_hv=2&w=900", categories["BASEBALL"]),

        # SOCCER (Europe & International)

        # BASEBALL (MLB)

        # BASKETBALL (NBA)
    ]

    return [
        Item(
            user_id=choice(users),
            name=name,
            description=description,
            price=price,
            category=category,
            condition=choice(conditions),
            image_url=image_url,
            size=choice(sizes),
            item_status=ItemStatusType.AVAILABLE,
        )
        for name, description, price, image_url, category in item_data
    ]

def seed_items():
    items = generate_items()
    db.session.add_all(items)
    db.session.commit()

def undo_items():
    table_name = f"{SCHEMA}.items" if environment == "production" else "items"
    db.session.execute(f"TRUNCATE TABLE {table_name} RESTART IDENTITY CASCADE;")
    db.session.commit()
