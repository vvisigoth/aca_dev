        var filterJSON = [{ "resultTitle": "What is the best type of filter to use on a bassline?", "resultExcerpt": "I tend to use a low-pass filter, but it really depends", "answeredBy": "anthonyarroyo"}, { "resultTitle": "How can I MIDI map the filter type?", "resultExcerpt": "You actually can't map filter type to a button. You have to map it to a knob, so that you can scroll through them.", "answeredBy": "AfroDJMac"}]
        var deviceRackJSON = [{ "resultTitle": "Is there a maximum number of chains in a device rack?", "resultExcerpt": "I don't think that there is a hard limit, but at some point it becomes unwiedly. I usually try to keep it under at least 128, since after that you can't effectively use the chain selector.", "answer_1": "Answer", "answeredBy": "anthonyarroyo"}, { "resultTitle": "How can you assign more than 8 macros?", "resultExcerpt": "You can only assign 8 macros, after that you have to use MIDI controllers.", "answer_1": "Answer", "answeredBy": "AfroDJMac"}]
        var resultsDictJSON1 = { "Filters": filterJSON, "Device Racks": deviceRackJSON }
        //Real stuff starts here
        var resultsDictJSON = [{ "key": "Filters", "resultTitle": "What is the best type of filter to use on a bassline?", "resultExcerpt": "I have a bassline that I want to be powerful (low) AND cut through the mix. I know that, in order to get this effect, I have to have some high frequencies as well as a sub. What can I do with filters to make this happen? PLease HELP!", "answers" : [{"answer": "I'd actually suggest using two separate filters, since yyou want to do two separate things. ", "ups": 5, "downs": 3, "answeredBy": "anthonyarroyo"}, {"answer": "Actually, a bandpass filter will totally accompolish what you're trying to do. And luckily, Live comes with one already installed. Check it out!", "ups": 9, "downs": 3,"answeredBy": "AfroDJMac"}]}, {"key": "Filters", "resultTitle": "How can I MIDI map the filter type?", "resultExcerpt": "You actually can't map filter type to a button. You have to map it to a knob, so that you can scroll through them.", "answeredBy": "AfroDJMac"}, {"key": "Device Racks",  "resultTitle": "Is there a maximum number of chains in a device rack?", "resultExcerpt": "I don't think that there is a hard limit, but at some point it becomes unwiedly. I usually try to keep it under at least 128, since after that you can't effectively use the chain selector.", "answer_1": "Answer", "answeredBy": "anthonyarroyo"}, {"key": "Device Racks", "resultTitle": "How can you assign more than 8 macros?", "resultExcerpt": "You can only assign 8 macros, after that you have to use MIDI controllers.", "answer_1": "Answer", "answeredBy": "AfroDJMac"},{"resultTitle":"How do I kick out some righteous jams?", "resultExcerpt":"Try more drugs"},{"resultTitle":"Who moved my cheese?", "resultExcerpt":"ask the doormouse"},{"resultTitle":"How do I make my snares sound crisper?", "resultExcerpt":"Subtle layering is the trick. You need to layer a few different snares, each EQed for a different frequency range."},{"resultTitle":"What's the best MIDI controller for DJ sets?", "resultExcerpt": "I personally like the Nocturn, but anything that has a crossfader will probably do. That,to me, is something that you can't scrimp on, though."},{ "key": "Filters", "resultTitle": "What is the best type of filter to use on a bassline?", "resultExcerpt": "I have a bassline that I want to be powerful (low) AND cut through the mix. I know that, in order to get this effect, I have to have some high frequencies as well as a sub. What can I do with filters to make this happen? PLease HELP!", "answers" : [{"answer": "I'd actually suggest using two separate filters, since yyou want to do two separate things. ", "ups": 5, "downs": 3, "answeredBy": "anthonyarroyo"}, {"answer": "Actually, a bandpass filter will totally accompolish what you're trying to do. And luckily, Live comes with one already installed. Check it out!", "ups": 9, "downs": 3,"answeredBy": "AfroDJMac"}]}, {"key": "Filters", "resultTitle": "How can I MIDI map the filter type?", "resultExcerpt": "You actually can't map filter type to a button. You have to map it to a knob, so that you can scroll through them.", "answeredBy": "AfroDJMac"}, {"key": "Device Racks",  "resultTitle": "Is there a maximum number of chains in a device rack?", "resultExcerpt": "I don't think that there is a hard limit, but at some point it becomes unwiedly. I usually try to keep it under at least 128, since after that you can't effectively use the chain selector.", "answer_1": "Answer", "answeredBy": "anthonyarroyo"}, {"key": "Device Racks", "resultTitle": "How can you assign more than 8 macros?", "resultExcerpt": "You can only assign 8 macros, after that you have to use MIDI controllers.", "answer_1": "Answer", "answeredBy": "AfroDJMac"},{"resultTitle":"How do I kick out some righteous jams?", "resultExcerpt":"Try more drugs"},{"resultTitle":"Who moved my cheese?", "resultExcerpt":"ask the doormouse"},{"resultTitle":"How do I make my snares sound crisper?", "resultExcerpt":"Subtle layering is the trick. You need to layer a few different snares, each EQed for a different frequency range."},{"resultTitle":"What's the best MIDI controller for DJ sets?", "resultExcerpt": "I personally like the Nocturn, but anything that has a crossfader will probably do. That,to me, is something that you can't scrimp on, though."},]
                $.each(resultsDictJSON, function(i, item){
                    $("#answerContentMainUl").append('<li id="' + i + '" class="answerTitle">' + item.resultTitle + '</li><ul><li class="answerExcerpt">' + item.resultExcerpt + //'<span class="answeredBy">' + item.answeredBy + '</span> 
                        '</li></ul>');
                });
                //submit new answer

            $(".answerTitle").click(function(){
                var id = this.id;
                //var title = this.class('answerTitle').text();
                var title = $("#" + id + ".answerTitle").text();
                var excerpt = resultsDictJSON[id]["resultExcerpt"];
                $("#questionExcerpt").html(excerpt);
                var a = [];
                // Make sure that div is cleared
                $("").replaceAll("#answers div.answer");
                var answers = resultsDictJSON[id]["answers"];
                answers = answers.sort(function (a, b){
                    return (b.ups - b.downs) - (a.ups - a.downs)
                    });
                $.each(answers, function(i, item){
                    a.push('<div id="' + i + '" class="answer"><div class="voteBox"><span class="up">up</span><span class="votes">' + (item.ups - item.downs)+ '</span><span class="down">down</span></div><li class="answertitle">' + item.answer + '</li><br><span class="answeredBy">' + item.answeredBy + '</span></div>');
                    });
                $("#answers").append(a.join( '' ) );
                $("#answerContentMain").hide();
                $("#singleAnswerContentMain").show();
            
                $("#answerListHeader1").text(title);
                $("#newAnswerSubmit").submit(function(){
                    var obj = {}
                    obj['answer'] = $("textarea").val();
                    obj['answeredBy'] = "me";
                    obj['ups'] = 0;
                    obj['downs'] = 0;
                    //alert($("textarea").val());
                    $("textarea").val("");
                    resultsDictJSON[id]["answers"].push(obj);
                    //alert(resultsDictJSON[id]["answers"]);
                    //alert(resultsDictJSON[id]["answers"]);
                    a = [];
                    $("").replaceAll("#answers div.answer");
                    var answers = resultsDictJSON[id]["answers"];
                    answers = answers.sort(function (a, b){
                        return (b.ups - b.downs) - (a.ups - a.downs)
                        });
                    $.each(answers, function(i, item){
                    a.push('<div id="' + i + '" class="answer"><div class="voteBox"><span class="up">up</span><span class="votes">' + (item.ups - item.downs)+ '</span><span class="down">down</span></div><li class="answertitle">' + item.answer + '</li><br><span class="answeredBy">' + item.answeredBy + '</span></div>');
                        });
                    
                    $("#answers").append(a.join( '' ) );
                var l = 1;
                $(".up").click(function(){
                        l = $(this).parent().parent().attr("id");
                        l = parseInt(l);
                        //alert(answers[id].ups);
                        answers[l].ups ++;
                        //alert(answers[id].ups);
                        var x = l + 1;
                        $("#answers div:nth-child(" + x + ") .voteBox span.votes").text((answers[l].ups - answers[l].downs));
                        });
                //vote down
                $(".down").click(function(){
                        l = $(this).parent().parent().attr("id");
                        l = parseInt(l);
                        answers[l].downs ++;
                        var x = l + 1;
                        $("#answers div:nth-child(" + x + ") .voteBox span.votes").text((answers[l].ups - answers[l].downs));
                        });
                    return false;
                    });
                //vote up
                var l = 1;
                $(".up").click(function(){
                        l = $(this).parent().parent().attr("id");
                        l = parseInt(l);
                        //alert(answers[id].ups);
                        answers[l].ups ++;
                        //alert(answers[id].ups);
                        var x = l + 1;
                        $("#answers div:nth-child(" + x + ") .voteBox span.votes").text((answers[l].ups - answers[l].downs));
                        });
                //vote down
                $(".down").click(function(){
                        l = $(this).parent().parent().attr("id");
                        l = parseInt(l);
                        answers[l].downs ++;
                        var x = l + 1;
                        $("#answers div:nth-child(" + x + ") .voteBox span.votes").text((answers[l].ups - answers[l].downs));
                        });
                $("#newAnswerCancelButton").click(function(){
                        $("#answerContentMain").show();
                        $("#singleAnswerContentMain").hide();
                        });
                });

            });
