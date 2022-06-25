import React from 'react';

import { giveConsent, registerAsClient } from '../../api/bt';

const TransactionsPage = () => {
    //registerAsClient();
    giveConsent();
    return (
        <div>
            Transactions Page
        </div>
    )
}

export default TransactionsPage;
