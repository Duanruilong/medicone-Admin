import dva from 'dva';
import './index.html';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/login'));
app.model(require('./models/product'));
app.model(require('./models/category'));
app.model(require('./models/banner'));
app.model(require('./models/requirement'));
app.model(require('./models/provider'));
app.model(require('./models/brand'));
app.model(require('./models/user'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
