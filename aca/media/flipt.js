$(document).ready(function(){
        function test1() {
            alert('test');
        }
        var instructions = "Looks like that question is new. Go ahead and enter the details of your question in this box and check the box below to be notified when an answer is posted!"
        function showNewQuestion(){
            $("#questionBar").slideUp();
            $("#newQuestion").show(200);
            $("#queryResults").slideUp();
            var newQuestionTitle = $("#tags").attr('value');
            $("#questionTitle").attr('value', newQuestionTitle);

        }
        function hideNewQuestion() {
            $("#newQuestion").slideUp();
            $("#questionBar").slideDown();
        }

        function showResults(){
            if( $("#queryResults").css('display') == 'none'){
                $("#queryResults").fadeIn();
                }else {
                //$("#queryResults").fadeOut();
            }
        }

        function postNewQuestion(title){
            $("#newQuestion").fadeOut();
            $("").replaceAll("#queryResults ul li");
            $("#queryResultsUl").append( '<li id="questionSuccess" class="resultTitle">' + title + '</li><ul><li class="resultExcerpt"> <span class="noAnswer">No Answer...yet.</span></li></ul>');
            // Most of this stuff will have to be modified on deploy, for prototype
            var newQuestionJSON = [{"resultTitle": title, "resultExcerpt": "No Answer...yet.", "answeredBy": ""}];
            tags.push(title);
            // Change the source for autocomplete after initialization
            $("#tags").autocomplete("option", "source", tags);
            resultsDictJSON[title] = newQuestionJSON;
            showResults();
            $("#tags").attr('value', "")
            $("#questionBar").slideDown();
            $("#queryResults ul li").delay(1200).fadeOut('slow');
        }
        

        var pos = 0;
        var tags = [
            "Clips",
            "Devices",
            "Device Racks",
            "Sampler",
            "Filters"
        ];
        var playlistJSON = [{"title": "Session View Overview", "src": " http://www.youtube.com/embed/KkqH8uIsiT8"}, {"title": "Launching Clips", "src" : "http://www.youtube.com/embed/GiIfclelUvw"}, {"title": "Start, Stop, Loop", "src" : "http://www.youtube.com/embed/7GKk1hasJbo"},  {"title": "Follow Actions", "src" : "http://www.youtube.com/embed/19OHd0HjvZ4"}, {"title": "Envelope Automation", "src" : "http://www.youtube.com/embed/ek8uJrZotg4"}, {"title": "How Time Works in Ableton", "src" : "http://www.youtube.com/embed/UNP3A9hFVR4"}, {"title": "MIDI Mapping Clips", "src" : "http://www.youtube.com/embed/BBHUdYeVI1Q"}, {"title": "Audio Clip Overview", "src" : "http://www.youtube.com/embed/Yi2juNIwwSU"}, {"title": "Warping", "src" : "http://www.youtube.com/embed/fO5w04k-7Q4"}, {"title": "Editing Audio Clips", "src" : "http://www.youtube.com/embed/QFNenlgIGXo"}, {"title": "Recording Audio Clips", "src" : "http://www.youtube.com/embed/EpjCEkUZ1pQ"}, {"title": "What is MIDI?", "src" : "http://www.youtube.com/embed/FvCneDKO458"}, {"title": "Basic MIDI Programming", "src" : "http://www.youtube.com/embed/3Aiq2CT0Cjs"}, {"title": "Recording MIDI Clips", "src" : "http://www.youtube.com/embed/UN5z5-cc_B0"}, {"title": "Dummy Clips", "src" : "http://www.youtube.com/embed/fxPq2bphVBA"}, {"title": "Recording Dummy Clips", "src" : "http://www.youtube.com/embed/MR9kHEQ8nuc"}, {"title": "Slice to MIDI", "src" : "http://www.youtube.com/embed/-mGSwx9vFzw"}, {"title": "Session View vs. Arrangement View", "src" : "http://www.youtube.com/embed/FZG5ZE-SSSg"}]                
            
        var resultsJSON = [{ "resultTitle": "What time is Workaholics on?", "resultExcerpt": "Dunno, ask Anthony."}, {"resultTitle": "Is Futurama better than the Simpsons?", "resultExcerpt": "I keep on hearing that it is, but I'm not so sure..."}]
        var filterJSON = [{ "resultTitle": "What is the best type of filter to use on a bassline?", "resultExcerpt": "I tend to use a low-pass filter, but it really depends", "answeredBy": "anthonyarroyo"}, { "resultTitle": "What is the purpose of bandpass filter?", "resultExcerpt": "A bandpass filter just lets a small frequency range pass through. You can think about it like a combination of a lowpass and a highpass", "answeredBy": "anthonyarroyo"}, { "resultTitle": "How can I MIDI map the filter type?", "resultExcerpt": "You actually can't map filter type to a button. You have to map it to a knob, so that you can scroll through them.", "answeredBy": "AfroDJMac"}]
        var deviceRackJSON = [{ "resultTitle": "Is there a maximum number of chains in a device rack?", "resultExcerpt": "I don't think that there is a hard limit, but at some point it becomes unwiedly. I usually try to keep it under at least 128, since after that you can't effectively use the chain selector.", "answer_1": "Answer", "answeredBy": "anthonyarroyo"}, { "resultTitle": "How can you assign more than 8 macros?", "resultExcerpt": "You can only assign 8 macros, after that you have to use MIDI controllers.", "answer_1": "Answer", "answeredBy": "AfroDJMac"},{ "resultTitle": "What is the main difference between a Simpler and a Sampler?", "resultExcerpt": "In many ways, the Sampler is a like device rack filled with Simplers. But to rack something up to mimic the Sampler would take a lot of work. Also, the zone controls for the Sampler are superior.", "answer_1": "Answer", "answeredBy": "AfroDJMac"}]
        var resultsDictJSON = { "Filters": filterJSON, "Device Racks": deviceRackJSON }
        var vidList = [];
        var answerList = [];
        var results = [];
        var deactivateVidNav = function(pos){
            if (pos == playlistJSON.length - 1){
                $("#next").addClass("deactivated");
                } else {
                $("#next").removeClass("deactivated");
            }
            if (pos == 0){
                $("#prev").addClass("deactivated");
                } else {
                $("#prev").removeClass("deactivated");
            }
        };

        function resultsList(key) {
            $.each(resultsDictJSON[key], function(i, item) {
                if (item.resultExcerpt != "No Answer...yet."){
                results.push('<li id="' + i + '" class="resultTitle">' + item.resultTitle + '</li><ul><li class="resultExcerpt">' + item.resultExcerpt + '<span class="answeredBy">' + item.answeredBy +'</span></li></ul>')
                } else {
                results.push('<li id="' + i + '" class="resultTitle">' + item.resultTitle + '</li><ul><li class="resultExcerpt"><span class="noAnswer">' + item.resultExcerpt + '</spane<span class="answeredBy">' + item.answeredBy +'</span></li></ul>')
                }

            });
            $("#queryResultsUl").append( results.join( '' ) );
            results = [];
        }

        // Prep page at load
        $("#courseVid").attr('src', playlistJSON[pos].src);
        deactivateVidNav(pos);
        $("#newQuestion").css('display', 'none');
        $("textarea").val(instructions);
        $("textarea").css('color', 'grey');
        // Populate Answer Page
        
        // Autocomplete 
    $(function() {
        $( "#tags" ).autocomplete({
        
            source: tags
        });
    });
        // Slide down results
        // Slide down announcements
        $("#logo").click(function(){
            if( $("#announce").css('display') == 'none'){
            $("#announce").slideDown();
            } else {
            $("#announce").fadeOut();
        }
        });
        // Check if announcement has been seen already. Announcement can come to page as JSON and include an expiration date. Set a cookie for the last announcement, so that the script can see if it has already been seen.

        // Generate clickable VidList from JSON
        // TODO replace this whole thing with the YT javascript API: Time stamp questions, make sure that prev, next works with sorted list
        $.each(playlistJSON, function(i, item) {
            vidList.push('<li id="' + i + '" class="vidListItem">' + item.title + '</li>');
        });
        $("#vidList ul").append( vidList.join( '' ) );
        $("#" + pos).addClass("isPlaying");
        //vidListIteam to navigate to video
        $(".vidListItem").click(function(){
            pos = this.id;
            $("#courseVid").attr('src', playlistJSON[pos].src);
            $(".isPlaying").removeClass("isPlaying");
            $(this).addClass("isPlaying");
            deactivateVidNav(pos);
        });
        // List of results from JSON to display in #queryResults
        // Previous and Next buttons
        $("#prev").click(function() {
            if (pos != 0){
            pos --;
            $(".isPlaying").removeClass("isPlaying");
            $("#" + pos).addClass("isPlaying");
            $("#courseVid").attr('src', playlistJSON[pos].src);
            } else{
        }
            deactivateVidNav(pos);
        });

        $("#next").click(function() {
            if (pos < playlistJSON.length - 1){
            pos ++;
            $(".isPlaying").removeClass("isPlaying");
            $("#" + pos).addClass("isPlaying");
            $("#courseVid").attr('src', playlistJSON[pos].src);
            } else {
        }
            deactivateVidNav(pos);
        });
        // Intercept submission, fadeIn results in INFO
        // TODO There is a bug on repeated question submission. My guess is that it is related to global v local variables
        $("#questionAsk").submit(function(){
            //$("#queryResults").fadeOut('fast');
            $("").replaceAll("#queryResults ul li");
            var submission = $("#tags").attr('value');
            if (submission != "Have a question? Ask it here!") {
                if (submission in resultsDictJSON){
                resultsList(submission);
                showResults();
                return false;
                } else {
                showNewQuestion();
                return false;
                }
            } else {
            alert("You don't have any questions?");
            return false;
        }
        });
        // Hide newQuestion on cancel
        $("#newQuestionCancel").click(function(){
            hideNewQuestion();
        });
        // Post a new question
        $("#newQuestionSubmit").click(function(){
            var title = $("#questionTitle").attr('value')
            postNewQuestion(title);

            return false;
        });
        $("textarea").focus(function(){
            if ( $("textarea").val() == instructions ){
                $("textarea").val("");
                $("textarea").css('color', 'black');
            }
            });
        $("textarea").blur(function(){
            if ( $("textarea").val() == "" ){
                $("textarea").css('color', 'grey');
                $("textarea").val(instructions);
            }
            });
        $(function() {
                $("#vidList ul").sortable();
                });

});
