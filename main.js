const betInput = document.querySelector('.bet-input');
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const btnStart = document.querySelector(".btn__start");
const dicesItem = $$(".figure:not(.figure--small) .figure__item");
const dices = $$(".figure--small .figure__item");
var figures = [
    {
        index: 0,
        image: './assets/img/deer.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 1,
        image: './assets/img/calabash.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 2,
        image: './assets/img/chicken.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 3,
        image: './assets/img/fish.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 4,
        image: './assets/img/crab.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 5,
        image: './assets/img/shrimp.png',
        percent: 16.6666,
        coin: 0,
    },
];
// Khởi tạo trò chơi
var user = {
    avatar: './assets/img/user.png',
    coin: 10,
    betTable: 2
}
function updateData() {
    var headerAvatar = document.querySelector('.header__avatar img');
    var headerMoney = document.querySelector('.money-text');
    headerAvatar.src = user.avatar;
    headerMoney.innerHTML = 'Tiền: ' + user.coin + ' đ';
    dicesItem.forEach((e, index) => {
        var img = e.querySelector('.figure__item--group img');
        var labelCoin = e.querySelector('.figure__item--group label');
        img.src = figures[index].image;
        labelCoin.innerHTML = figures[index].coin;
    });
}
updateData();
// Lấy ngẫu nhiên một phần tử trong danh sách figures theo tỉ lệ
var randomFigure = () => {
    var value = Math.random() * 100;
    var sum = 0;
    var element;
    for (var i = 0; i < figures.length; i++) {
        sum += figures[i].percent;
        if (sum > value) {
            element = figures[i];
            break;
        }
    }
    return element || figures[0];
}
// Xử lý lắc xúc sắc
if (btnStart) {
    btnStart.onclick = () => {
        // Kiểm tra người chơi đã đặt cược chưa?
        var flag = false;
        for (var i = 0; i < figures.length; i++)
            if (figures[i].coin > 0) {
                flag = true;
                break;
            }
        if (!flag)
            return;
        var wins = [];
        var t = 0;
        var timer = setInterval(() => {
            t += 100;
            if (t >= 1500) {
                clearInterval(timer);
                winOfLose(wins);
            } else {
                wins = [randomFigure(), randomFigure(), randomFigure()];
                dices[0].querySelector('img').src = wins[0].image;
                dices[1].querySelector('img').src = wins[1].image;
                dices[2].querySelector('img').src = wins[2].image;
            }
        }, 100);
    };
}
// Đặt tiền
dicesItem.forEach((item) => {
    item.onclick = () => {
        var bet = Number(betInput.value) || 0 ;
        if (user.coin >= bet && bet > 0) {
            user.coin -= bet;
            figures[item.dataset.id].coin += bet;
            updateData();
        }
    }
})
// Xử lý thắng thua
function winOfLose(wins) {
    var winCoin = 0;
    
    // đếm số lần xuất hiện
    var count = [0, 0, 0, 0, 0, 0];

    for (var i = 0; i < wins.length; i++) {
        count[wins[i].index]++;
    }

    // tính tiền
    for (var i = 0; i < figures.length; i++) {
        if (count[i] > 0) {
            winCoin += figures[i].coin * (count[i] + 1);
        }
    }

    // reset cược
    for (var j = 0; j < figures.length; j++) {
        figures[j].coin = 0;
    }

    user.coin += winCoin;
    updateData();

    if (winCoin > 0)
        alert("Bạn thắng " + winCoin + " đồng");
}
