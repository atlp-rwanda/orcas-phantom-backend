import app from './index';
import db from './database/connection';

const port = process.env.PORT || 3000;

app.listen(port, console.log(`server has started on port ${port}`));

db.authenticate().then(() => console.log('Database connected...')).catch((err) => console.log(`Error ${err}`));
export default db;
