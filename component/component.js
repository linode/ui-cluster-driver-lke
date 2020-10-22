/*!!!!!!!!!!!Do not change anything between here (the DRIVERNAME placeholder will be automatically replaced at buildtime)!!!!!!!!!!!*/
// https://github.com/rancher/ui/blob/master/lib/shared/addon/mixins/cluster-driver.js
import ClusterDriver from 'shared/mixins/cluster-driver';

// do not remove LAYOUT, it is replaced at build time with a base64 representation of the template of the hbs template
// we do this to avoid converting template to a js file that returns a string and the cors issues that would come along with that
const LAYOUT;
/*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/

const languages = {
  'en-us': {
    'clusterNew': {
      'linode': {
        'accessConfig': {
          'next': 'Proceed to Cluster Configuration',
          'loading': 'Verifying your access token',
          'title': 'Linode Account Access Configuration',
          'description': 'Provide us with the access token that will be used to access your linode account'
        },
        "accessToken": {
          "label": "Access Token",
          "placeholder": "The access token to use for accessing your linode account",
          "required": "Access Token is required"
        }
      }
    }
  }
}


/*!!!!!!!!!!!GLOBAL CONST START!!!!!!!!!!!*/
// EMBER API Access - if you need access to any of the Ember API's add them here in the same manner rather then import them via modules, since the dependencies exist in rancher we dont want to expor the modules in the amd def
const computed     = Ember.computed;
const observer     = Ember.observer;
const get          = Ember.get;
const set          = Ember.set;
const alias        = Ember.computed.alias;
const service      = Ember.inject.service;
const all          = Ember.RSVP.all;
const next         = Ember.run.next;

/*!!!!!!!!!!!GLOBAL CONST END!!!!!!!!!!!*/



/*!!!!!!!!!!!DO NOT CHANGE START!!!!!!!!!!!*/
export default Ember.Component.extend(ClusterDriver, {
  driverName:  '%%DRIVERNAME%%',
  configField: '%%DRIVERNAME%%EngineConfig', // 'googleKubernetesEngineConfig'
  app:         service(),
  router:      service(),
  /*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/
  session: service(),
  intl: service(),
  
  step: 1,
  lanChanged: null,
  refresh: false,

  init() {
    /*!!!!!!!!!!!DO NOT CHANGE START!!!!!!!!!!!*/
    // This does on the fly template compiling, if you mess with this :cry:
    const decodedLayout = window.atob(LAYOUT);
    const template      = Ember.HTMLBars.compile(decodedLayout, {
      moduleName: 'shared/components/cluster-driver/driver-%%DRIVERNAME%%/template'
    });
    set(this,'layout', template);

    this._super(...arguments);
    /*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/

    // for languages
    const lang = get(this, 'session.language');
    get(this, 'intl.locale');
    this.loadLanguage(lang);

    let config      = get(this, 'config');
    let configField = get(this, 'configField');


    
    if ( !config ) {
      config = this.get('globalStore').createRecord({
        type:               configField,
        accessToken: "haha",
        apiURL: "",
        apiVersion: "",
        region: "",
        kubernetesVersion: "",
        tags: [],
        nodePools: []
      });

      set(this, 'cluster.%%DRIVERNAME%%EngineConfig', config);
    }
  },

  config: alias('cluster.%%DRIVERNAME%%EngineConfig'),


  actions: {
    save() {
      console.log("saveFunc")
    },
    cancelFunc(cb){
      console.log("cancelFunc")
      // probably should not remove this as its what every other driver uses to get back
      get(this, 'router').transitionTo('global-admin.clusters.index');
      cb(true);
    },
  },


  // Add custom validation beyond what can be done from the config API schema
  validate() {
    // Get generic API validation errors
    this._super();
    var errors = get(this, 'errors')||[];
    if ( !get(this, 'cluster.name') ) {
      errors.push('Name is required');
    }

    // Add more specific errors

    // Check something and add an error entry if it fails:
    // if ( parseInt(get(this, 'config.memorySize'), defaultRadix) < defaultBase ) {
    //   errors.push('Memory Size must be at least 1024 MB');
    // }

    // Set the array of errors for display,
    // and return true if saving should continue.
    if ( get(errors, 'length') ) {
      set(this, 'errors', errors);
      return false;
    } else {
      set(this, 'errors', null);
      return true;
    }
  },

  // Any computed properties or custom logic can go here

  // For languages
  languageChanged: observer('intl.locale', function() {
    const lang = get(this, 'intl.locale');

    if (lang) {
      this.loadLanguage(lang[0]);
    }
  }),
  loadLanguage(lang) {
    const translation = languages[lang] || languages['en-us'];
    const intl = get(this, 'intl');

    intl.addTranslations(lang, translation);
    intl.translationsFor(lang);
    set(this, 'refresh', false);
    next(() => {
      set(this, 'refresh', true);
      set(this, 'lanChanged', +new Date());
    });
  },

  // For Access Token step
  accessTitle: computed('intl.locale', 'langChanged', function() {
    return get(this, 'intl').t("clusterNew.linode.accessConfig.title");
  }),
  accessDetail: computed('intl.locale', 'langChanged', function() {
    return get(this, 'intl').t("clusterNew.linode.accessConfig.description");
  })
});
