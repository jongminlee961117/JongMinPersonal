const express = require('express');
const cors = require('cors');  
const app = express();
const port = 3000;


app.use(cors()); 


const businesses = [
    {
        name: 'Walmart',
        category: 'needs',
        link: 'https://www.walmart.com',
        giftCardLink: 'https://www.walmart.com/gift-cards'
    },
    {
        name: 'Amazon',
        category: 'needs',
        link: 'https://www.amazon.com',
        giftCardLink: 'https://www.amazon.com/gift-cards'
    },
    {
        name: 'Canadian Tire',
        category: 'needs',
        link: 'https://www.canadiantire.ca',
        giftCardLink: 'https://www.canadiantire.ca/gift-cards'
    },
    {
        name: 'Tim Hortons',
        category: 'meals',
        link: 'https://www.timhortons.ca',
        giftCardLink: 'https://www.timhortons.ca/gift-cards'
    },
    {
        name: 'Costco',
        category: 'meals, needs',
        link: 'https://www.costco.com',
        giftCardLink: 'https://www.costco.com/gift-cards'
    }
];


app.get('/businesses/category/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const filteredBusinesses = businesses.filter(b => b.category.includes(category));

    console.log('Request received for category:', req.params.category);
    
    if (filteredBusinesses.length > 0) {
        res.json(filteredBusinesses);
    } else {
        res.status(404).json({ message: 'No businesses found in this category' });
    }
});


app.get('/businesses/name/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const business = businesses.find(b => b.name.toLowerCase() === name);

    if (business) {
        res.json({
            name: business.name,
            link: business.link,
            giftCardLink: business.giftCardLink
        });
    } else {
        res.status(404).json({ message: 'Business not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
