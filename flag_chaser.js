// ------------------------------------------------------------------------
//   Flag Chaser for StarMash
// ------------------------------------------------------------------------
(function () {
    /* INIT */
    function init () {

        initEvents ();
        
    }

    function initEvents () {

        SWAM.on ( 'CTF_FlagEvent', onFlagEvent );

    }

    SWAM.on ( 'gameLoaded', init );
    
    jQuery.fn.justtext = function() {
  
        return $(this)	.clone()
                .children()
                .remove()
                .end()
                .text();

    };
    /* EVENTS */
      
    function onFlagEvent ( event, team, verb ) {

        if ( team === 1 ) {
            
            // var carriername = $( "#blueflag-name" ).text();
            var carriername = $( "#blueflag-name" ).justtext();
            console.log("flag blue " + carriername);
            
        } else if ( team === 2 ) {
            
            // var carriername = $( "#redflag-name" ).text();
            //var carrierid = 
            var carriername = $( "#redflag-name" ).justtext();
            console.log("flag red " + carriername);
            
        }

        
      }
    
    /* REGISTER */

    SWAM.registerExtension ({
        name: 'Flag Chaser',
        id: 'FlagChaser',
        description: '',
        version: '1.0.0',
        author: 'xplay'
    });
    
}());