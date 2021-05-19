import React from "react";
import axios from "axios";

const About = () => {
  const sendData = () => {
    axios.put(
      `https://e-shop-d051e-default-rtdb.europe-west1.firebasedatabase.app/.json`,
      {
        categories: "[bags, rings, necklaces]",
        items: {
          bags: [
            {
              category: "bags",
              id: 0,
              description: "Чёрная сумка куптиь гараж онлайн без смс",
              imageUrl:
                "https://www.slamjam.com/on/demandware.static/-/Sites-catalog-slamjam-master/default/dw0571276e/hi-res/AAUTB0013FA01_S21-BLK0001_00.png",
              price: 300,
              text: "Black bag",
            },
            {
              category: "bags",
              id: 1,
              imageUrl:
                "https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dw9a0deb54/images/full/10005112-C/2019/10005112-Canyon_Gym_Bag_full.png",
              price: 200,
              text: "Чёрная сумка",
            },
            {
              category: "bags",
              id: 2,
              imageUrl:
                "https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dw9a0deb54/images/full/10005112-C/2019/10005112-Canyon_Gym_Bag_full.png",
              price: 1200,
              text: "Чёрная ass",
            },
          ],
          rings: [
            {
              category: "rings",
              id: 3,
              imageUrl:
                "https://i.pinimg.com/originals/9f/53/d1/9f53d128cfcb2db4300958db0ef53e55.png",
              price: 300,
              text: "Golden ring",
            },
            {
              category: "rings",
              id: 4,
              imageUrl: "https://sc04.alicdn.com/kf/UT8Eu8AXRtaXXcUQpbXm.png",
              price: 500,
              text: "Серебрянное кольцо",
            },
          ],
          necklaces: [
            {
              category: "necklaces",
              id: 5,
              imageUrl:
                "https://media2.bulgari.com/f_auto,q_auto/production/dwd8a09b8d/images/images/459608.png",
              price: 3300,
              text: "Golden necklace",
            },
          ],
        },
      }
    );
  };
  const newData = () => {
    axios({
      method: "post",
      url: `https://e-shop-d051e-default-rtdb.europe-west1.firebasedatabase.app/items/rings/.json`,
      data: {
        id: 5,
        imageUrl: "https://sc04.alicdn.com/kf/UT8Eu8AXRtaXXcUQpbXm.png",
        price: 23500,
        text: "Серебрянное кольцо",
      },
    });
  };
  return (
    <>
      <h1>About us page</h1>
      <button onClick={() => sendData()}>Send text</button>
      <button onClick={() => newData()}>new text</button>
    </>
  );
};

About.propTypes = {};

export default About;
