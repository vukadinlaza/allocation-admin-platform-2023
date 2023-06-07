'use client';

import React, { useCallback, useState, useEffect } from 'react';

import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from 'react-plaid-link';

const Plaid = () => {
  const searchParams = new URLSearchParams(document.location.search)
  const [dealId, setDealId] = useState<string | null>(searchParams.get('dealId'));
  const [token, setToken] = useState<string | null>(searchParams.get('linkToken'));
  
  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    window.location.href = 'https://allocations1.retool.com/apps/0329b7a0-0540-11ee-be75-f3197775bdf8/Admin_Banking/Admin_Banking_Plaid_Link?dealId=' + dealId + '&publicToken=' + publicToken;
  }, []);
  const onEvent = useCallback<PlaidLinkOnEvent>((eventName, metadata) => {
    console.log(eventName, metadata);
  }, []);
  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    window.location.href = 'https://allocations1.retool.com/apps/82e62cc4-03e9-11ee-b052-3b23c0294b0d/Admin_Banking/Admin_Banking_Lite';
  }, []);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
    onExit,
    onEvent
  };

  const {
    open,
    ready
  } = usePlaidLink(config);

  React.useEffect(() => {
    open();
  }, [ready, open]);
  
  return (
    <></>
  );
};

export default Plaid;