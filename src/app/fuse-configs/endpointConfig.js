const endpoint = 'https://us-central1-insurancewebapptest.cloudfunctions.net';
// const endpoint = 'http://localhost:5001/insurancewebapptest/us-central1';

export const firebaseFuncitonSendEmailEndpoint = endpoint + '/sendMailOverHTTP';
export const firebaseFunctionDeleteUserEndpoint = endpoint + '/deleteUser';
export const firebaseFunctionGetProductsEndpoint = endpoint + '/getProducts';
export const firebaseFunctionCancelSubscriptionEndpoint = endpoint + '/calcelSubscription';
export const firebaseFunctionGetSubscrioption = endpoint + '/getSubscription'
export const firebaseFunctionGetCardTokenEndpoint = endpoint + '/getCardToken';
export const firebaseFunctionCreateCustomerAndSubscription = endpoint + '/createCustomerAndSubscription';
export const firebaseFunctionUpdateSubscription = endpoint + '/updateSubscription';
export const firebaseFunctionGetClient=  endpoint+'/clientResult';
export const deployOfficerEndpoint = 'https://agent-backoffice-agency.web.app';
export const deployProducerEndpoint = 'https://agent-backoffice-producer.web.app';
// export const deployOfficerEndpoint = 'https://officer-staging.netlify.app';
// export const deployProducerEndpoint = 'https://producer-staging.netlify.app';
