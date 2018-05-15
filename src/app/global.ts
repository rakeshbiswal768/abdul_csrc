export const GlobalVariable = Object.freeze({
    // Stg URL
    // BASE_API_URL: 'http://safe-profile-staging.azurewebsites.net',
    // Dev URL
    BASE_API_URL: 'http://safe-profile-dev.azurewebsites.net',

    // Use the below line during Prod
    // BASE_API_URL: '',

    // Global Variable
    COUNT: 5,

    // Dashboard
    RECENT_ACTIVITY: '/api/Dashboard/RecentActivity/${companyId}',
    IN_PROGRESS: '/api/Dashboard/InProgress/${companyId}',
    PENDING_REQUEST: '/api/Dashboard/PendingRequests/${companyId}',
    GET_NEW_REQUESTS: '/api/Dashboard/NewRequests/${companyId}',
    MY_REQUESTS: '/api/Dashboard/MyInProgress/${companyId}',
    TO_APPROVE: '/api/Dashboard/MyToApprove/${companyId}',
    GET_ALL_REQUESTS: '/api/${companyId}/Request',

    // Company
    GET_COMPANIES: '/api/Company/GetCompanies',
    GET_LICENSE_MODELS: '/api/Public/GetLicenseModels',
    // SET_LICENSE_PLAN: '/api/Company/SetLicensePlan/${companyId}',
    // got updates on 03/24/2018 GET_LICENSE_PLAN: '/api/LicensePlan/SignUpInfo/${userId}',
    GET_LICENSE_PLAN: '/api/licenseplan/signupinfo/${companyid}',
    POST_LICENSE_PLAN: '/api/LicensePlan/SignUp',
    POST_LICENSE_PLAN_UPGRADE: '/api/LicensePlan/Upgrade',
    GET_ALL_LICENSE_PLANS: '/api/LicensePlan/Plans',
    REGISTER_COMPANY_INFO: '/api/Company/RegisterCompanyAndInfo',
    REGISTER_COMPANY: '/api/Company/RegisterCompany',
    UPDATE_COMPANY_INFO: '/api/Company/UpdateCompanyInformation/${companyId}',
    COMPANY_INFO: '/api/Company/CompanyInformation/${companyId}',
    REGISTER_CONTACT_INFO: '/api/Company/RegisterContactInformation/${companyId}',
    GET_CONTACT_INFO: '/api/Company/GetContactInformation/${companyId}',
    GET_CURRENT_USER: '/api/Company/GetCurrentUser/${companyId}',
    // Audit log
    GET_ACTIVITY_LOG: '/api/Company/${companyId}/GetActivityLog',
    GET_USERS_LOG: '/api/Company/${companyId}/GetAssignedUsers',

    // Roles
    ASSIGN_ROLE_TO_USER: '/api/Company/AssignRoleToUser/${companyId}',
    GET_ASSIGNED_ROLES: '/api/Company/GetAssignedRoles/${companyId}',
    GET_POSSIBLE_ROLES: '/api/Company/GetPossibleRoles/${companyId}',
    DELETE_Role_From_User: '/api/Company/RemoveRoleFromUser/${companyId}/${userId}/${roleType}',
    POST_DEFAULT_APPROVER: '/api/Company/SetDefaultApprover/${companyId}',
    PUT_ASSIGN_APPROVER: '/api/${companyId}/Request/AssignApprover/${requestId}',
    // Assign a user to have a approval turned on. just assign a null if approval should be turned off
    GET_DEFAULT_ASSIGNED_APPROVER: '/api/Company/GetDefaultAssignedApprover/${companyId}',

    CREATE_UPDATE_TEMPLATE: '/api/Company/${companyId}/Template/CreateOrUpdateTemplate',
    SET_TEMPLATE_ACTIVE: '/api/Company/${companyId}/Template/SetTemplateActive/${templateId}/${isActive}',
    DELETE_TEMPLATE: '/api/Company/${companyId}/Template/DeleteTemplate/${templateId}',
    GET_TEMPLATE_WITH_ID: '/api/Company/${companyId}/Template/GetTemplate/${templateId}',
    GET_TEMPLATE: '/api/Company/${companyId}/Template/GetTemplates',
    GET_CONSUMERS: '/api/Company/GetConsumers/${companyId}',
    GET_EMPLOYEES: '/api/Company/GetEmployees/${companyId}',

    // Get Countries
    // GET_COUNTRIES: '/api/Public/GetCountries',
    GET_COUNTRIES: '/api/CountryInfo',
    // Account
    REGISTER: '/api/account/Register',
    FORGOT_PASSWORD: '/api/account/ForgotPassword',
    RESET_PASSWORD: '/api/account/ResetPassword',
    // REQUEST
    CREATE_REQUEST: '/api/${companyId}/Request/CreateRequest',
    ADD_MODIFY_DATA_REQUEST: '/api/${companyId}/Request/AddOrModifyDataOnRequest/${requestId}',
    ADD_FILES_REQUEST: '/api/${companyId}/Request/AddFilesToRequest/${requestId}',
    DELETE_FILE_FROM_REQ: '/api/${companyId}/Request/DeleteFileFromRequest/${requestId}/${fragmentId}',
    GET_REQUEST: '/api/${companyId}/Request/GetRequest/${requestId}',
    GET_REQUEST_CATEGORIES: '/api/${companyId}/Request/GetRequestCategories/${requestId}',
    PUT_ASSIGN_TO_USER: '/api/${companyId}/Request/AssignToUser/${requestId}',
    PUT_ASSIGNAPPROVER: '/api/${companyId}/Request/AssignApprover/${requestId}',
    PUT_CANCEL_READY_FOR_APPROVE: '/api/${companyId}/Request/CancelReadyForApprove/${requestId}',
    PUT_APPROVE_REQUEST: '/api/${companyId}/Request/Approve/${requestId}',
    PUT_CANCEL_REQUEST: '/api/${companyId}/Request/CancelRequest/${requestId}',
    PUT_READY_FOR_APPROVE: '/api/${companyId}/Request/ReadyForApprove/${requestId}',
    DELETE_REQUESTDATA: '/api/RequestData/${requestDataId}',
    GET_FILE_FOR_DOWNLOAD: '/api/RequestData/${requestDataId}/file',
    // Settings
    GET_COMPANY_SETTINGS_INFO: '/api/Settings/CompanySettings/${companyId}',
    POST_COMPANY_SETTINGS_INFO: '/api/Settings/CompanySettings/${companyId}',
    GET_COMPANY_LOGO: '/api/Settings/CompanyLogo/${companyId}',
    GET_PUBLIC_LOGO: '/api/Public/CompanyLogo/${companyId}',
    GET_PERSONAL_SETTINGS: '/api/Settings/PersonalSettings',
    POST_PERSONAL_SETTINGS: '/api/Settings/PersonalSettings',

    // Consumer Request
    // GET_CR_CATEGORIES: '/api/ConsumerRequest/${companyId}/Categories',
    GET_CR_CATEGORIES: '/api/InformationTypes',
    POST_CR_REQUESTVERIFICATIONFOREMAIL: '/api/ConsumerRequest/${companyId}/RequestVerificationForEmail',
    POST_CR_REQUESTVERIFICATIONFORPHONE: '/api/ConsumerRequest/${companyId}/RequestVerificationForPhone',
    POST_CR_MAKEREQUEST: '/api/ConsumerRequest/${companyId}/MakeRequest',
    GET_DELIVERY_INFO: '/api/ConsumerRequest/${companyId}/DeliveryInfo/${deliveryKey}',
    GET_DOWNLOAD_DELIVERY: '/api/ConsumerRequest/${companyId}/DownloadDelivery/${deliveryKey}',

    // InformationTypes
    GET_INFORMATIONTYPES: '/api/InformationTypes',
    GET_INFORMATIONTYPES_COMPANYID: '/api/InformationTypes/${companyId}',
    GET_CATEGORIES: '/api/categories',
    PUT_INFORMATIONTYPES: '/api/InformationTypes/${companyId}',
    DEL_INFORMATIONTYPES: '/api/InformationTypes/${companyId}',

    // CompanyTemplateForms
    GET_COMPANYTEMPLATEFORMS_CID: '/api/CompanyTemplateForms/${companyId}',
    POST_COMPANYTEMPLATEFORMS_CID: '/api/CompanyTemplateForms/${companyId}',
    DELETE_COMPANYTEMPLATEFORMS_CID_TID: '/api/CompanyTemplateForms/${companyId}/${templateFormId}',
    GET_COMPANYTEMPLATEFORMS_CID_TID: '/api/CompanyTemplateForms/${companyId}/${templateFormId}',
    PATCH_COMPANYTEMPLATEFORMS_CID_TID: '/api/CompanyTemplateForms/${companyId}/${templateFormId}',
    PUT_COMPANYTEMPLATEFORMS_CID_TID: '/api/CompanyTemplateForms/${companyId}/${templateFormId}',

    // RequestData
    PATCH_REQUESTDATA_ID: '/api/RequestData/${requestDataId}',
    GET_REQUESTDATA_ID: '/api/RequestData/${requestId}',
    POST_REQUESTDATA_REQID: '/api/RequestData/${requestId}'

});


export class GlobalStorage {
    constructor() { }
    public localStoragebtn(): string {
        if (sessionStorage.getItem('buttonColor') != null || sessionStorage.getItem('buttonColor') !== 'undefined') {
            return sessionStorage.getItem('buttonColor');
        }
        // else {
        //     return null;
        // }
    }
    public localStorage(): string {
        if (sessionStorage.getItem('dateFormat')) {
            if (sessionStorage.getItem('dateFormat') === 'dd/MM/yyyy') {
                return 'dd MM yyyy';
            } else {
                return 'MM dd yyyy';
            }
        }
    }
    public localStorageaccent(): string {
        if (sessionStorage.getItem('accentColor')) {
            return sessionStorage.getItem('accentColor');
        }
    }
    public localStorageContrast(): string {
        if (sessionStorage.getItem('useHighContrast')) {
            return sessionStorage.getItem('useHighContrast');
        }
    }
}
