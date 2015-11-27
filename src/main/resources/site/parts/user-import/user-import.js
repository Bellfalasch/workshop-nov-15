var libs = {
	portal: require('/lib/xp/portal'),
	contentLib: require('/lib/xp/content'),
	thymeleaf: require('/lib/xp/thymeleaf'),
	auth: require('/lib/xp/auth'),
	util: require('/lib/enonic/util/util')
};
var view = resolve('user-import.html');

var logs = libs.util.log;


exports.get = function(req) {

	var component = libs.portal.getComponent();

	if ( libs.auth ) {
		log.info("Auth-lib installed");
	}
/*
	log.info("libs.auth %s", libs.auth);
	log.info("libs.auth.findPrincipals %s", libs.auth.findPrincipals);

	if ( libs.auth.findPrincipals ) {
		log.info("auth.findPrincipals found");
	}
*/

	// Get all groups
	var groups = libs.auth.findPrincipals({
			type: 'group',
			userStore: 'system',
			start: 0,
			count: 100
		});

	if ( groups ) {
		log.info("Groups found:");
		if ( groups.total > 0 ) {
			log.info( groups.total + " found!" );
		} else {
			log.info("Empty result");
		}
		logs(groups);
	}

	// Get all users
	var users = libs.auth.findPrincipals({
			type: 'user',
			userStore: 'system',
			start: 0,
			count: 100
		});

	if ( users ) {
		log.info("Users found:");
		if ( users.total > 0 ) {
			log.info( users.total + " found!" );
		} else {
			log.info("Empty result");
		}
		logs(users);
	}

	var model = {
		'config': component.config,
		'groups': groups,
		'users': users
	};

    return {
    	body: libs.thymeleaf.render(view, model)
    };

};