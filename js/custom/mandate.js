$(document).ready(function () { return SUGGEST.sendRequest(); });

(function () {
    var sendRequest;
    var displayMandateToSign;
    this.SUGGEST = {
        sendRequest: function () {
            return $("#mandateToSignKO").submit(function() {
                var rawMandate = {
                    "creditor":{ "key": "value" },
                    "debtor":{
                        "iban":{ "value": "iban" },
                        "bic":{ "value": "bic" },
                        "name":"name",
                        "adress":{ "value": "adress" },
                        "email" : "email@toto.fr"
                    },
                    "scheme":"core",
                    "frequency": {
                        "type": "subscription",
                        "value": {
                            "startDate": "1404916685000",
                            "period": "day/week/x days/month/year"
                        }
                    },
                    "contractBetweenCreditorAndDebtor":{
                        "id":"id",
                        "description":"description"
                    }
                }

                $.ajax({
                    url: 'http://localhost:9000/api/mandateToSign',
                    type: 'POST',
                    data: JSON.stringify(rawMandate),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    async: true,
                    crossOrigin: true,
                    success: function(response) { return SUGGEST.displayMandateToSign(response) }
                });


                return false;
            })
        },

        displayMandateToSign: function(data) {
            console.log(data)
        }
    }
}).call(this);
        /**
         *
         * retrievePreviewResults: function () {
            return $("#events").submit(function () {
                var suggestVal;
                var userSearch;
                suggestVal = $("#suggest").val();
                userSearch = suggestVal ? suggestVal.join(" ").toUpperCase() : "";
                if (userSearch !== "")$.ajax({type: "GET", url: "/event/tags/" + userSearch, dataType: "json", success: function (data) {
                    SUGGEST.displayPreviewResult(data);
                    return SUGGEST.displaySubscription(userSearch)
                }, error: function (data) {
                    return SUGGEST.displayNoResult(userSearch)
                }}); else {
                    $("#subscription").hide();
                    $("#callbackNoResult").hide()
                }
                return false
            })
        },
         */

        /*suggest: function () {
        return $("#suggest").on("keyup", function () {
            var liAddDomElement;
            var ulAddDomElement;
            ulAddDomElement = "\x3cul\x3e\x3c/ul\x3e";
            if (!$("#suggest + ul").length)$(this).after(ulAddDomElement);
            liAddDomElement = "\x3cli\x3e" + $(this).val() + "\x3c/li\x3e";
            return $("#suggest + ul").append(liAddDomElement)
        })
    }, deleteSuggest: function () {
        return $("#suggest").on("blur", function () {
            return $("#suggest + ul").remove()
        })
    },
        displaySubscription: function (userSearch) {
            var applicationBaseUrl;
            var applicationBaseUrl_withoutHttp;
            var googleCalendarLinkPrefix;
            var googleCalendarLinkSuffix;
            if (userSearch !== "") {
                googleCalendarLinkPrefix = "http://www.google.com/calendar/render?cid\x3d";
                googleCalendarLinkSuffix = "/events/" + encodeURIComponent(userSearch);
                applicationBaseUrl = $(location).attr("href").substr(0, $(location).attr("href").length - 1);
                applicationBaseUrl_withoutHttp = applicationBaseUrl.split("//")[1];
                $("#subscription a.ical").attr("href",
                        "/events/" + userSearch);
                $("#subscription a.gcal").attr("href", googleCalendarLinkPrefix + encodeURIComponent(applicationBaseUrl + googleCalendarLinkSuffix));
                $("#subscription a.webcal").attr("href", "webcal://" + applicationBaseUrl_withoutHttp + "/events/" + encodeURIComponent(userSearch));
                $("#subscription").show();
                return $("#devoxx").hide()
            }
        }, displayPreviewResult: function (data) {
            return display(data.eventList, preview2display, data.size)
        }, displayAllEvents: function (data) {
            return display(data, allEvent2display, data.length)
        },
        displayNoResult: function (searchWord) {
            $("#previewEvents").empty();
            $("#subscription").hide();
            $("#resultSize").hide();
            $("#callbackNoResult").text("Le mot cl\u00e9 '" + searchWord + "' ne donne aucun r\u00e9sultat dans la base OneCalendar");
            return $("#callbackNoResult").show()
        }, retrieveAllEvents: function () {
            return $.ajax({type: "GET", url: "/events", dataType: "json", success: function (data) {
                return SUGGEST.displayAllEvents(data)
            }, error: function () {
                return SUGGEST.displayNoResult($("#suggest").val())
            }})
        }, retrievePreviewResults: function () {
            return $("#events").submit(function () {
                var suggestVal;
                var userSearch;
                suggestVal = $("#suggest").val();
                userSearch = suggestVal ? suggestVal.join(" ").toUpperCase() : "";
                if (userSearch !== "")$.ajax({type: "GET", url: "/event/tags/" + userSearch, dataType: "json", success: function (data) {
                    SUGGEST.displayPreviewResult(data);
                    return SUGGEST.displaySubscription(userSearch)
                }, error: function (data) {
                    return SUGGEST.displayNoResult(userSearch)
                }}); else {
                    $("#subscription").hide();
                    $("#callbackNoResult").hide()
                }
                return false
            })
        }, formatIcalDate: function (date) {
            var begin;
            begin = moment(date).zone("+0200");
            if (begin.minutes() === 0)return begin.format("DD/MM/YYYY \u00e0 HH[h]"); else return begin.format("DD/MM/YYYY \u00e0 HH[h]mm")
        }, retrieveEventNumber: function () {
            return $.ajax({type: "GET", url: "/event/count", dataType: "json", success: function (data) {
                return SUGGEST.displayEventNumber(data)
            }, error: function (data) {
                return SUGGEST.displayEventNumber({"eventNumber": "N/A"})
            }})
        }, displayEventNumber: function (data) {
            return $("#eventNumber").text(data.eventNumber)
        }};
    preview2display = function (event) {
        return{date: SUGGEST.formatIcalDate(event.event.begin),
            title: event.event.title, location: event.event.location, description: event.event.description, tags: tagsToCamel(event.event.tags)}
    };
    toCamel = function (tag) {
        return tag.charAt(0).toUpperCase() + tag.substr(1).toLowerCase()
    };
    tagsToCamel = function (tags) {
        var tag;
        var _i;
        var _len;
        var _results;
        if (tags !== void 0) {
            _results = [];
            for (_i = 0, _len = tags.length; _i < _len; _i++) {
                tag = tags[_i];
                _results.push(toCamel(tag))
            }
            return _results
        } else return[]
    };
    allEvent2display = function (event) {
        return{date: SUGGEST.formatIcalDate(event.begin), title: event.title,
            location: event.location, description: event.description, tags: tagsToCamel(event.tags)}
    };
    display = function (events, transformer, sizeForAll) {
        var event;
        var i;
        var previewElement;
        var tag;
        var tagsContent;
        var _i;
        var _results;
        $("#previewEvents").empty();
        $("#callbackNoResult").hide();
        if (sizeForAll > 4)$("#resultSize").html("" + (sizeForAll - 4) + " autres \u00e9v\u00e8nements trouv\u00e9s"); else $("#resultSize").html("\x26nbsp;");
        previewElement = $("#previewEvents");
        _results = [];
        for (i = _i = 0; _i <= 4; i = ++_i) {
            if (events[i] !== void 0) {
                event =
                    transformer(events[i]);
                tagsContent = event.tags !== void 0 ? function () {
                    var _j;
                    var _len;
                    var _ref;
                    var _results1;
                    _ref = event.tags;
                    _results1 = [];
                    for (_j = 0, _len = _ref.length; _j < _len; _j++) {
                        tag = _ref[_j];
                        if (tag !== void 0)_results1.push("\x3cspan class\x3d'round label secondary'\x3e" + tag + "\x3c/span\x3e")
                    }
                    return _results1
                }().join(" ") : "";
                previewElement.append("\t\t\t                         \x3cli\x3e\t\t\t                           \x3cul class\x3d'pricing-table'\x3e\t\t\t                             \x3cli class\x3d'title'\x3e" +
                    event.date + "\x3c/li\x3e\t\t\t                             \x3cli class\x3d'price'\x3e" + event.title + "\x3c/li\x3e\t\t\t                             \x3cli class\x3d'description'\x3e" + event.location + "\x3c/li\x3e\t\t\t                             \x3cli class\x3d'description oc-description oc-collapse'\x3e" + event.description + "\x3c/li\x3e\t\t\t                             \x3cli class\x3d'text-center'\x3e " + tagsContent + " \x3c/li\x3e\t\t\t                                   \x3cli class\x3d'cta-button'\x3e\t\t\t                                     \x3cdiv class\x3d'row'\x3e\t\t\t                                       \x3cul id\x3d'subscription' class\x3d'button-group'\x3e\t\t\t                                         \x3cdiv class\x3d'large-4 columns'\x3e\t\t\t                                           \x3cli\x3e\x3ca href\x3d'#' class\x3d'left ical button secondary'\x3e\x3ci class\x3d'fi-clipboard-notes oc-icon'/\x3e To\x26nbsp;copy \x3c/a\x3e\x3c/li\x3e\t\t\t                                         \x3c/div\x3e\t\t\t                                         \x3cdiv class\x3d'large-4 columns'\x3e\t\t\t                                           \x3cli\x3e\x3ca href\x3d'#' class\x3d'centered gcal button secondary'\x3e\x3ci class\x3d'fi-calendar oc-icon'/\x3e Google \x3c/a\x3e\x3c/li\x3e\t\t\t                                         \x3c/div\x3e\t\t\t                                         \x3cdiv class\x3d'large-4 columns'\x3e\t\t\t                                           \x3cli\x3e\x3ca href\x3d'#' class\x3d'right webcal button secondary'\x3e\x3ci class\x3d'fi-social-apple oc-icon'/\x3e Apple \x3c/a\x3e\x3c/li\x3e\t\t\t                                         \x3c/div\x3e\t\t\t                                       \x3c/ul\x3e\t\t\t                                     \x3c/div\x3e\t\t\t                                    \x3c/li\x3e\t\t\t                           \x3c/ul\x3e\t\t\t                         \x3c/li\x3e")
            } else previewElement.append("\t\t\t                         \x3cspan class\x3d'title'\x3e\x3c/span\x3e\t\t\t                         \x3cspan class\x3d'date'\x3e\x3c/span\x3e\t\t\t                         \x3cspan class\x3d'location'\x3e\x3c/span\x3e");
            _results.push($("#previewEvents .pricing-table .oc-description").mouseenter(function () {
                $(this).removeClass("oc-collapse", 400, "easeOutBounce")
            }).mouseleave(function () {
                $(this).addClass("oc-collapse", 400, "easeOutBounce")
            }).click(function () {
                $(this).toggleClass("oc-collapse", 400, "easeOutBounce")
            }))
        }
        return _results
    }
}).call(this);*/