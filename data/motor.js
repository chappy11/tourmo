
const img = [
    require('../asset/motor/motor1.jpeg'),
    require('../asset/motor/motor2.jpeg'),
    require('../asset/motor/motor3.jpeg'),
    require('../asset/motor/motor4.jpeg')
];


export const motors = [
    {
        motorname: "Honda Click 150",
        brand: "Honda",
        CC: 150,
        motorImg:img[0],
        distance: 100,
        rate:"500.00",
        user: {
            name: "John Doe",
            user_pic: require('../asset/user.png')
        },
         coordinate: {
            lat: 10.3016,
            lng:123.8705
        }
    },
    {
        motorname: "MIO I 125",
        brand: "Yamaha",
        CC: 125,
        rate:"250.00",
        motorImg:img[1],
        distance: 200,
        user: {
            name: "Jason Doe",
            user_pic: require('../asset/user.png')
        },
        coordinate: {
            lat: 10.2873,
            lng:123.8795
        }
    },
    {
        motorname: "Raider 150 I",
        brand: "Suzuki",
        CC: 150,
        motorImg:img[2],
        distance: 210,
        rate:"500.00",
        user: {
            name: "Rey Doe",
            user_pic: require('../asset/user.png'),
        },
        coordinate: {
            lat: 10.2990,
            lng:123.8813
        }
    },
    {
        motorname: "NMax 150",
        brand: "Yamaha",
        CC: 150,
        motorImg:img[3],
        distance: 220,
        rate:"600.00",
        user: {
            name: "Jay Doe",
            user_pic: require('../asset/user.png'),
        },
        coordinate: {
            lat: 10.2990,
            lng:123.8813
        }
    }

]