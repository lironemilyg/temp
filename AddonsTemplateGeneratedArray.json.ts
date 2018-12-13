[{
  "name": "AzureActiveDirectoryDashboard_{Workspace_Name}",
  "type": "Microsoft.Portal/dashboards",
  "location": "{Dashboard_Location}",
  "tags": {
    "addonKey": "AzureActiveDirectoryDashboard",
    "hidden-title": "Azure Active Directory - {Workspace_Name}",
    "version": "1.0",
    "workspaceName": "{Workspace_Name}"
  },
  "properties": {
    "lenses": {
      "0": {
        "order": 0,
        "parts": {
          "0": {
            "position": {
              "x": 1,
              "y": 0,
              "colSpan": 17,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">General overview</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "1": {
            "position": {
              "x": 19,
              "y": 0,
              "colSpan": 7,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Users Activity</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "2": {
            "position": {
              "x": 0,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top AzureActiveDirectory operations\r\nOfficeActivity\r\n| where OfficeWorkload == \"AzureActiveDirectory\"\r\n| summarize count() by Operation\r\n| order by count_\r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Operation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "e5af5953-8c1e-436a-ae56-a76ff225ea07"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Operations by type",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "3": {
            "position": {
              "x": 6,
              "y": 1,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//AzureActiveDirectory operations over time\nOfficeActivity\n| where TimeGenerated >= ago(14d)\n| where OfficeWorkload == \"AzureActiveDirectory\"\n| summarize Current_Week = countif(TimeGenerated >= ago(7d)), Previous_Week = countif(TimeGenerated < ago(7d)) by Operation\n| extend Per = iff(Current_Week > Previous_Week, toreal(Current_Week) / Previous_Week, toreal(Previous_Week) / Current_Week)\n| extend sign = iff(Current_Week > Previous_Week, \"+\", \"-\")\n| extend Percentage = iff(Current_Week != 0 and Previous_Week != 0 and Previous_Week != Current_Week, strcat(sign, extract(@\"(\\d*(\\.\\d{1,2}|$))\", 1, tostring((Per -1 )*100)), \"%\"), \"No Percentage - 0\")\n| project Operation, Previous_Week, Current_Week, Percentage\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "4ee3fbd9-18e7-402f-a1df-d7ef71a7b74a"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Activity per operation",
                  "PartSubTitle": "Week Over Week"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              },
              "filters": {
                "MsPortalFx_TimeRange": {
                  "model": {
                    "format": "local",
                    "granularity": "auto",
                    "relative": "1d"
                  }
                }
              }
            }
          },
          "4": {
            "position": {
              "x": 19,
              "y": 1,
              "colSpan": 7,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//AzureActiveDirectory operations over time\nOfficeActivity\n| where OfficeWorkload == \"AzureActiveDirectory\"\n| summarize Events = count() by bin_at(TimeGenerated, 1d, now()) \n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Events",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "3e977483-2bd7-4c13-a17b-ac02b5886bbc"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Activity over time",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              },
              "filters": {
                "MsPortalFx_TimeRange": {
                  "model": {
                    "format": "local",
                    "granularity": "auto",
                    "relative": "1d"
                  }
                }
              }
            }
          },
          "5": {
            "position": {
              "x": 0,
              "y": 5,
              "colSpan": 18,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Additions, Updates, Deletions</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "6": {
            "position": {
              "x": 19,
              "y": 5,
              "colSpan": 7,
              "rowSpan": 5
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//AzureActiveDirectory operations over time\nOfficeActivity\n| where OfficeWorkload == \"AzureActiveDirectory\"\n| summarize Amount = count() by UserId\n| top 10 by Amount\n| project User_ID =  UserId, Amount\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "c6004e80-d6bb-475d-aba9-bd817d97de00"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 10 active users",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "7": {
            "position": {
              "x": 0,
              "y": 6,
              "colSpan": 18,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\n| where OfficeWorkload == \"AzureActiveDirectory\"\n| summarize additions = countif(Operation contains \"add\"), updates = countif(Operation contains \"Update\"), deletions = countif(Operation contains \"Delete\") by bin_at(TimeGenerated, 1d, now())"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "deletions",
                        "type": "Int64"
                      },
                      {
                        "name": "additions",
                        "type": "Int64"
                      },
                      {
                        "name": "updates",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "d95e9c41-ab8b-44e5-931e-3511521bafcd"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Additions VS Updates VS Deletions",
                  "PartSubTitle": "Over the past week"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              },
              "filters": {
                "MsPortalFx_TimeRange": {
                  "model": {
                    "format": "local",
                    "granularity": "auto",
                    "relative": "1d"
                  }
                }
              }
            }
          },
          "8": {
            "position": {
              "x": 0,
              "y": 10,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity \r\n| where OfficeWorkload == \"AzureActiveDirectory\"\r\n| where Operation contains \"add\"\r\n| summarize count() by Operation, bin_at(TimeGenerated, 1h, now()) \r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Operation",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "412f8581-42fe-4c76-850c-9aec4004d2b4"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "GroupedBar"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Adding operations",
                  "PartSubTitle": "by type, over time"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "9": {
            "position": {
              "x": 6,
              "y": 10,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity \r\n| where OfficeWorkload == \"AzureActiveDirectory\"\r\n| where Operation contains \"update\"\r\n| summarize count() by Operation, bin_at(TimeGenerated, 1h, now()) \r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Operation",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "02bfb13a-3fa6-4cb0-ae06-80af5dd6ab54"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "GroupedBar"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Updating operations",
                  "PartSubTitle": "by type, over time"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "10": {
            "position": {
              "x": 12,
              "y": 10,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity \r\n| where OfficeWorkload == \"AzureActiveDirectory\"\r\n| where Operation contains \"delete\"\r\n| summarize count() by Operation, bin_at(TimeGenerated, 1h, now()) \r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Operation",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "4a895dc8-34f0-4c73-b5bc-f9eed7449253"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "GroupedBar"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Deleting operations ",
                  "PartSubTitle": "by type, over time"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "11": {
            "position": {
              "x": 19,
              "y": 10,
              "colSpan": 7,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Activity by User type\r\nOfficeActivity\r\n| where OfficeWorkload == \"AzureActiveDirectory\"\r\n| summarize count() by UserType\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "UserType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "905469fc-2a41-4637-ba34-84feb358bca7"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Activity by user type",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "12": {
            "position": {
              "x": 0,
              "y": 14,
              "colSpan": 18,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Users - Groups</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "13": {
            "position": {
              "x": 19,
              "y": 14,
              "colSpan": 7,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">User Logons</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "14": {
            "position": {
              "x": 0,
              "y": 15,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity \r\n| where OfficeWorkload == \"AzureActiveDirectory\"\r\n| where Operation contains \"user\"\r\n| summarize count() by Operation\r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Operation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "77d6ebe2-5afc-4f1a-9592-d7bca00a63e7"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "User operations",
                  "PartSubTitle": "By type",
                  "Query": "OfficeActivity \n| where OfficeWorkload == \"AzureActiveDirectory\"\n| where Operation contains \"user\" and Operation != \"UserLoggedIn\"\n| summarize count() by Operation\n"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "15": {
            "position": {
              "x": 6,
              "y": 15,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\n| where OfficeWorkload == \"AzureActiveDirectory\"\n| where Operation contains \"user\" and Operation != \"UserLoggedIn\"\n| top 10 by TimeGenerated desc\n| project Operation, UserId , ResultStatus\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "879f26ca-215c-4624-b50e-ac49916c4b8a"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "User operation events",
                  "PartSubTitle": "Last 10"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "16": {
            "position": {
              "x": 12,
              "y": 15,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity \n| where OfficeWorkload == \"AzureActiveDirectory\"\n| where Operation == \"Add user.\"\n| project TimeGenerated, User_Name=todynamic(AADTarget)[0].ID\n| summarize by tostring(User_Name), TimeGenerated\n| limit 10\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "bc8f871e-fa66-4fb3-8eb4-b94096c200c6"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "New users",
                  "PartSubTitle": "User name, Time - last 10"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "17": {
            "position": {
              "x": 19,
              "y": 15,
              "colSpan": 7,
              "rowSpan": 3
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\n| where OfficeWorkload == \"AzureActiveDirectory\"\n| where Operation == \"UserLoggedIn\"\n| summarize Logons = count() by ResultStatus, bin_at(TimeGenerated, 1h, now())"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Logons",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "fc6b0018-e776-429e-91dc-2cff0721eab9"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "User logons",
                  "PartSubTitle": "Fail VS Success"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "18": {
            "position": {
              "x": 19,
              "y": 18,
              "colSpan": 7,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Failed Operations</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "19": {
            "position": {
              "x": 0,
              "y": 19,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity \r\n| where OfficeWorkload == \"AzureActiveDirectory\"\r\n| where Operation contains \"group\"\r\n| summarize count() by Operation"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Operation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "17896e4c-0872-41d4-bbad-f8bc61fb9cb1"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Group operations",
                  "PartSubTitle": "By type"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "20": {
            "position": {
              "x": 6,
              "y": 19,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\n| where OfficeWorkload == \"AzureActiveDirectory\"\n| where Operation contains \"group\"\n| top 10 by TimeGenerated desc\n| project Operation, UserId , ResultStatus\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "82bb1da4-fc89-4c3f-b356-05315803f703"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Group operation events",
                  "PartSubTitle": "Last 10"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "21": {
            "position": {
              "x": 12,
              "y": 19,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity \n| where OfficeWorkload == \"AzureActiveDirectory\"\n| where Operation == \"Add group.\"\n| project Group_Name=todynamic(AADTarget)[0].ID, TimeGenerated\n| sort by TimeGenerated\n| limit 10"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "5b5d670e-188c-40e1-aa17-bbbea21e86e6"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "New groups",
                  "PartSubTitle": "Group name, Time - last 10"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "22": {
            "position": {
              "x": 19,
              "y": 19,
              "colSpan": 7,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Failed operations by operation\nOfficeActivity\n| where OfficeWorkload == \"AzureActiveDirectory\"\n| where ResultStatus == \"Failure\"\n| summarize count() by Operation, bin_at(TimeGenerated, 1h, now())\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Operation",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/AzureActiveDirectoryDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "db0b2916-3d18-46eb-8f8b-a9a2139c46e7"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": ""
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Failed operations by type",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "23": {
            "position": {
              "x": 0,
              "y": 0,
              "colSpan": 1,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [
                {
                  "name": "subscriptionId",
                  "value": "{Subscription_Id}"
                },
                {
                  "name": "resourceGroup",
                  "value": "{Resource_Group}"
                },
                {
                  "name": "workspaceName",
                  "value": "{Workspace_Name}"
                }
              ],
              "type": "Extension/Microsoft_Azure_Security_Insights/PartType/AsiOverviewPart",
              "defaultMenuItemId": "0"
            }
          }
        }
      }
    }
  }
},{
  "name": "CiscoDashboard_{Workspace_Name}",
  "type": "Microsoft.Portal/dashboards",
  "location": "{Dashboard_Location}",
  "tags": {
    "addonKey": "CiscoDashboard",
    "hidden-title": "Cisco - {Workspace_Name}",
    "version": "1.0",
    "workspaceName": "{Workspace_Name}"
  },
  "properties": {
    "lenses": {
      "0": {
        "order": 0,
        "parts": {
          "0": {
            "position": {
              "x": 1,
              "y": 0,
              "colSpan": 18,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Cisco Overview</div>\n\n",
                    "title": "",
                    "subtitle": "My subtitle"
                  }
                }
              }
            }
          },
          "1": {
            "position": {
              "x": 19,
              "y": 0,
              "colSpan": 6,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<img width='450' height='50' src='https://bitwizards.com/bitwizards/media/blogs/jeff-mitchell/2015/may/cisco-router/2015-05-05-topimage.jpg'/>\n",
                    "title": "",
                    "subtitle": "My subtitle"
                  }
                }
              }
            }
          },
          "2": {
            "position": {
              "x": 0,
              "y": 1,
              "colSpan": 13,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//severity count\nCommonSecurityLog\n| where DeviceVendor == \"Cisco\"\n| where DeviceProduct == \"ASA\"\n| summarize SeverityVolume= count() by LogSeverity\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "LogSeverity",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "SeverityVolume",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "d669fb39-3d3c-4109-8019-08f17d5ae112"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Traffic By Event Severity",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "3": {
            "position": {
              "x": 13,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//no. of concurrent sessions\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where DeviceEventClassID  == \"302010\"\n| extend ConcurrentSession= extract(\"%ASA-6-302010: ([0-9]*?) in use,\",1,Message)\n| summarize AvgSession=avg(toint(ConcurrentSession)) by TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "AvgSession",
                        "type": "Double"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "a396b4a0-be52-4965-bb96-a0cd793540eb"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Average Concurrent Sessions Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "4": {
            "position": {
              "x": 19,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Count by Action\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where DeviceAction != \"\"\n| summarize ActionCount= count() by SimplifiedDeviceAction\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "SimplifiedDeviceAction",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "ActionCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "ff598f07-4502-4992-9164-7fc607d3b625"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Firewall Action Event Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "5": {
            "position": {
              "x": 0,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Max Sessions\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where DeviceEventClassID  == \"302010\"\n| extend MaxSessions= extract(\"%ASA-6-302010:.*, ([0-9].*?) most used\",1,Message)\n| summarize AvgSession=avg(toint(MaxSessions)) by TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "AvgSession",
                        "type": "Double"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "9e0f12d6-a118-4163-8826-1864f3bd6007"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Average Max Concurrent Sessions Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "6": {
            "position": {
              "x": 6,
              "y": 5,
              "colSpan": 7,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//volume by time\nCommonSecurityLog\n| where DeviceVendor == \"Cisco\"\n| where DeviceProduct == \"ASA\"\n| summarize Volme=count() by TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Volme",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "0a05ab08-5e9d-4073-8cba-1fd25c08a2a2"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Event Count Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "7": {
            "position": {
              "x": 13,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//severity by time\nCommonSecurityLog\n| where DeviceVendor == \"Cisco\"\n| where DeviceProduct == \"ASA\"\n| summarize SeverityVolume= count() by LogSeverity, TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "SeverityVolume",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "LogSeverity",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "97999b99-b3a8-4c07-8970-f3299f7cd50a"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Event Severity Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "8": {
            "position": {
              "x": 19,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top 5 reason for packet drop\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where DeviceEventClassID == \"733100\"\n| extend TraficType= extract(\"%ASA-4-733100: \\\\[(.*?)\\\\]\",1,Message)\n| summarize AttackCount=count() by TraficType\n| top 5 by AttackCount desc\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TraficType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "AttackCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "c179ca70-97c8-4398-b366-be6d295b5d9d"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Reasons For Packet Drop",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "9": {
            "position": {
              "x": 0,
              "y": 9,
              "colSpan": 25,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Firewall Log Trend and Action</div>",
                    "title": "",
                    "subtitle": "My subtitle"
                  }
                }
              }
            }
          },
          "10": {
            "position": {
              "x": 0,
              "y": 10,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Communication direction count by time\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where CommunicationDirection != \"\"\n| summarize DirectionVolume=count() by CommunicationDirection, TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "DirectionVolume",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "CommunicationDirection",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "ecdf022f-f258-4d0b-a9f5-2e87a5c57d89"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Inbound Outbound Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "11": {
            "position": {
              "x": 6,
              "y": 10,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//out bound\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where CommunicationDirection contains   \"outbound\"\n| summarize TrafficVolume=count() by SimplifiedDeviceAction, TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "TrafficVolume",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "SimplifiedDeviceAction",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "6c479c3a-08af-4814-aed6-d92fa263d9cb"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Outbound Traffic Connection Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "12": {
            "position": {
              "x": 12,
              "y": 10,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//allowd vs denied for in bound\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where CommunicationDirection contains   \"inbound\"\n| where SimplifiedDeviceAction in (\"Deny\", \"Allow\")\n| summarize TrafficVolume=count() by SimplifiedDeviceAction, TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "TrafficVolume",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "SimplifiedDeviceAction",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "6b76c1d9-8896-4cb0-8cc7-29e599fca0fd"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Inbound Traffic Action Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "13": {
            "position": {
              "x": 18,
              "y": 10,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Communication direction count\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where CommunicationDirection != \"\"\n| summarize DirectionVolume=count() by CommunicationDirection\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "CommunicationDirection",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "DirectionVolume",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "f0dc387c-fe5e-4ec2-a418-a4d314a5e3c1"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Inbound Outbound Traffic Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "14": {
            "position": {
              "x": 24,
              "y": 10,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Reason for packet Drop time trend\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where DeviceEventClassID == \"733100\"\n| extend TraficType= extract(\"%ASA-4-733100: \\\\[(.*?)\\\\]\",1,Message)\n| summarize AttackCount=count() by TraficType, TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "AttackCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "TraficType",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "2d3b7b1c-cfd0-4bb8-ad55-578d74c3a15d"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Reason For Packet Dropping Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "15": {
            "position": {
              "x": 0,
              "y": 14,
              "colSpan": 25,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">TOP 5 Ports Allowed & Blocked</div>\n",
                    "title": "",
                    "subtitle": "My subtitle"
                  }
                }
              }
            }
          },
          "16": {
            "position": {
              "x": 0,
              "y": 15,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top 5 port inbound Allow\r\nCommonSecurityLog\r\n| where DeviceProduct == \"ASA\"\r\n| where DeviceVendor == \"Cisco\"\r\n| where DeviceEventClassID == \"106100\" \r\n| where SimplifiedDeviceAction == \"Allow\"\r\n| where Message contains \" -> inside\" \r\n| extend DestinationPortS=tostring(DestinationPort)  \r\n| summarize PortCount=count() by DestinationPortS\r\n| top 5 by PortCount desc"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "DestinationPortS",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "PortCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "eb8b5c71-cb66-4b8c-a05e-e128d1c24005"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Inbound Ports Allowed",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "17": {
            "position": {
              "x": 6,
              "y": 15,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top 5 port inbound deny\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where CommunicationDirection contains   \"inbound\"\n| where SimplifiedDeviceAction == \"Deny\"\n| extend DestinationPortS=tostring(DestinationPort)\n| summarize PortCount=count() by DestinationPortS\n| top 5 by PortCount desc\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "DestinationPortS",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "PortCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "3ea9408e-4fda-4e29-90cf-c8fc01db6b74"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Inbound Ports Blocked ",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "18": {
            "position": {
              "x": 12,
              "y": 15,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top 5 port outbound Allow\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where DeviceEventClassID == \"106100\"\n| where SimplifiedDeviceAction == \"Allow\"\n| where Message contains \" -> management\"\n| extend DestinationPortS=tostring(DestinationPort)\n| summarize PortCount=count() by DestinationPortS\n| top 5 by PortCount desc\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "DestinationPortS",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "PortCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "beaae82d-5eb9-45f9-a31c-1f96dec4eae4"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Ports Allowed",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "19": {
            "position": {
              "x": 18,
              "y": 15,
              "colSpan": 7,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Outbound Ports Denied\r\nCommonSecurityLog\r\n| where DeviceProduct == \"ASA\"\r\n| where DeviceVendor == \"Cisco\""
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "7678ddf2-f79c-49e8-946f-4427c72006be"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Ports Denied",
                  "PartSubTitle": "{Workspace_Name}",
                  "Query": "//Top 5 Outbound Ports Denied\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where CommunicationDirection contains   \"outbound\"\n| where SimplifiedDeviceAction == \"Deny\" \n| extend DestinationPortS=tostring(DestinationPort)  \n| summarize PortCount=count() by DestinationPortS\n| top 5 by PortCount desc "
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "20": {
            "position": {
              "x": 0,
              "y": 19,
              "colSpan": 25,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">TOP 5 IP Address Allowed & Blocked</div>",
                    "title": "",
                    "subtitle": "My subtitle"
                  }
                }
              }
            }
          },
          "21": {
            "position": {
              "x": 0,
              "y": 20,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top 5 protocol Deny\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where Protocol != \"\"\n| where SimplifiedDeviceAction == \"Deny\"\n| summarize ProtocolCount= count() by Protocol\n| top 5 by ProtocolCount\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Protocol",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "ProtocolCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "cafb54c2-f6ea-4fcc-a5a4-bdf0f3a88da4"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 protocol Denied",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "22": {
            "position": {
              "x": 6,
              "y": 20,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top 5 protocol Allow\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where Protocol != \"\"\n| where SimplifiedDeviceAction == \"Allow\"\n| summarize ProtocolCount= count() by Protocol\n| top 5 by ProtocolCount\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Protocol",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "ProtocolCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "cb958e69-b8cb-4e78-9bf1-0510feaccf0e"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Protocols Allowed",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "23": {
            "position": {
              "x": 12,
              "y": 20,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Inbound Destination IP Addresses Blocked\r\nCommonSecurityLog\r\n| where DeviceProduct == \"ASA\"\r\n| where DeviceVendor == \"Cisco\"\r\n| where CommunicationDirection contains   \"inbound\"\r\n| where SimplifiedDeviceAction == \"Deny\"\r\n| summarize IpCount= count()  by DestinationIP\r\n| top 5 by IpCount desc nulls last\r\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "66d7c8bd-58bf-4b6f-bb4e-2c76f2a2782f"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Inbound Destination IP Addresses Blocked",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "24": {
            "position": {
              "x": 18,
              "y": 20,
              "colSpan": 7,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Inbound Destination IP Addresses Allowed\r\nCommonSecurityLog\r\n| where DeviceProduct == \"ASA\"\r\n| where DeviceVendor == \"Cisco\"\r\n| where CommunicationDirection contains   \"inbound\"\r\n| where DestinationIP != \"\"\r\n| where SimplifiedDeviceAction == \"Allow\" or SimplifiedDeviceAction == \"Built\"\r\n| summarize IpCount= count()  by DestinationIP\r\n| top 5 by IpCount desc nulls last"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "80ffa6c5-fc20-4f72-9938-547dd8b0b80e"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Inbound Destination IP Addresses Allowed",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "25": {
            "position": {
              "x": 0,
              "y": 24,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top 5 outbound deny dst ip\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where DeviceEventClassID == \"106100\"\n| where SimplifiedDeviceAction == \"Deny\"\n| where Message contains \" -> management\"\n| summarize IpCount= count()  by DestinationIP\n| top 5 by IpCount desc nulls last\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "DestinationIP",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "IpCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "4db3575b-7a7e-4add-b14e-7d0aceeb1633"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Destination IP Addresses Denied",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "26": {
            "position": {
              "x": 6,
              "y": 24,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top 5 outbound Allow dst ip\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where DeviceEventClassID == \"106100\"\n| where SimplifiedDeviceAction == \"Allow\"\n| where Message contains \" -> management\"\n| summarize IpCount= count()  by DestinationIP\n| top 5 by IpCount desc nulls last\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "DestinationIP",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "IpCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "3845c029-779e-468e-9eb5-aa0ab1d373bc"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Destination IP Addresses Allowed",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "27": {
            "position": {
              "x": 12,
              "y": 24,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Inbound Source IP Addresses Denied\r\nCommonSecurityLog\r\n| where DeviceProduct == \"ASA\"\r\n| where DeviceVendor == \"Cisco\"\r\n| where CommunicationDirection contains   \"inbound\"\r\n| where SimplifiedDeviceAction == \"Deny\"\r\n| summarize IpCount= count()  by SourceIP\r\n| top 5 by IpCount desc nulls last"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "14d65713-9485-4d9a-9044-c8399596886c"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Inbound Source IP Addresses Denied",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "28": {
            "position": {
              "x": 18,
              "y": 24,
              "colSpan": 7,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Outbound Source IP Addresses Allowed\r\nCommonSecurityLog\r\n| where DeviceProduct == \"ASA\"\r\n| where DeviceVendor == \"Cisco\"\r\n| where CommunicationDirection contains   \"outbound\"\r\n| where SimplifiedDeviceAction == \"Built\"\r\n| summarize IpCount= count()  by SourceIP\r\n| top 5 by IpCount desc nulls last"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "f1eccf54-99d1-4f31-b9c3-bd3aa0e58e87"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Source IP Addresses Allowed",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "29": {
            "position": {
              "x": 0,
              "y": 28,
              "colSpan": 25,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Firewall Management</div>\n",
                    "title": "",
                    "subtitle": "My subtitle"
                  }
                }
              }
            }
          },
          "30": {
            "position": {
              "x": 0,
              "y": 29,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top 10 commands\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where DeviceEventClassID == \"111008\"\n| extend CommandExecuted= extract(\"%ASA-5-111008: User '.*?' executed the '(.*?)' command.\",1,Message)\n| summarize Count= count() by CommandExecuted\n| top 5 by Count desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "c4ceeb6d-4b09-4ca8-9e7a-22447327dde4"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Commands Executed on Firewall",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "31": {
            "position": {
              "x": 6,
              "y": 29,
              "colSpan": 5,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Source IP Addresses By Failed Authentication\r\nCommonSecurityLog\r\n| where DeviceProduct == \"ASA\"\r\n| where DeviceVendor == \"Cisco\"\r\n| where DeviceEventClassID == \"611102\"\r\n| extend IPAddress= extract(\"%ASA-6-611102:.*: IP address: (.*?), Uname.*\",1,Message)\r\n| summarize IPAddressCount=count() by IPAddress\r\n| top 5 by IPAddressCount desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "85b3f777-a756-4233-8b62-e1330c415bd5"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Source IP Addresses By Failed Authentication",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "32": {
            "position": {
              "x": 11,
              "y": 29,
              "colSpan": 5,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Login Attempts For Nonexistent User Account\r\nCommonSecurityLog\r\n| where DeviceProduct == \"ASA\"\r\n| where DeviceVendor == \"Cisco\"\r\n| where DeviceEventClassID == \"113015\"\r\n| extend ipaddress=extract(\"%ASA-6-113015:.*: user IP = (.*)$\",1,Message)\r\n| summarize IPCount=count() by ipaddress\r\n| top 5 by  IPCount desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "24deded9-5ff5-41aa-b568-636af82c9def"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Login Attempts For Nonexistent User Account By Source IP Addresses",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "33": {
            "position": {
              "x": 16,
              "y": 29,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 SSH Failed Attempt By Source IP\r\nCommonSecurityLog\r\n| where DeviceProduct == \"ASA\"\r\n| where DeviceVendor == \"Cisco\"\r\n| where DeviceEventClassID == \"315011\"\r\n| extend IP= extract(\"%ASA-6-315011: SSH session from (.*) on\",1,Message)\r\n| summarize  ReasonCount=count() by IP\r\n| top 5 by ReasonCount  desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "ac387c57-98d0-4822-93f6-3c2f296d9ac1"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 SSH Failed Attempt By Source IP Addresses",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "34": {
            "position": {
              "x": 22,
              "y": 29,
              "colSpan": 3,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Authentocation Success\nCommonSecurityLog\n| where DeviceProduct == \"ASA\"\n| where DeviceVendor == \"Cisco\"\n| where DeviceEventClassID == \"113012\"\n| extend UserName= extract(\"%ASA-6-113012:.*: user = (.*)$\",1,Message)\n| summarize UserCount=count() by UserName\n| top 5 by UserCount desc\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "UserName",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "UserCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CiscoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "83678fda-fe05-4a83-b61f-c457740a84bf"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Successfully Authenticated Users ",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "35": {
            "position": {
              "x": 0,
              "y": 0,
              "colSpan": 1,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [
                {
                  "name": "subscriptionId",
                  "value": "{Subscription_Id}"
                },
                {
                  "name": "resourceGroup",
                  "value": "{Resource_Group}"
                },
                {
                  "name": "workspaceName",
                  "value": "{Workspace_Name}"
                }
              ],
              "type": "Extension/Microsoft_Azure_Security_Insights/PartType/AsiOverviewPart",
              "defaultMenuItemId": "0"
            }
          }
        }
      }
    }
  }
},{
  "name": "CylanceDashboard_{Workspace_Name}",
  "type": "Microsoft.Portal/dashboards",
  "location": "{Dashboard_Location}",
  "tags": {
    "addonKey": "CylanceDashboard",
    "hidden-title": "Cylance - {Workspace_Name}",
    "version": "1.0",
    "workspaceName": "{Workspace_Name}"
  },
  "properties": {
    "lenses": {
      "0": {
        "order": 0,
        "parts": {
          "0": {
            "position": {
              "x": 1,
              "y": 0,
              "colSpan": 11,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Cylance Overview</div> ",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "1": {
            "position": {
              "x": 12,
              "y": 0,
              "colSpan": 6,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<body style=\"background-color:#FF0000;\"><img width='600' height='50' src='https://download.cylance.com/updates/CylanceDetectImages/cylance_signin_logo.png'/>\r\n</body>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "2": {
            "position": {
              "x": 0,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//log type trend\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| summarize LogTypeCount= count() by LogType , TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "LogTypeCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "LogType",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "d88fd7ce-0325-45b7-80bf-7f4aa8709fa7"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Event Type Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "3": {
            "position": {
              "x": 6,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//log volume trend\nSyslog\n| where Computer == \"sysloghost\" \n| summarize LogVolume= count() by TimeGenerated "
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "LogVolume",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "5256b3b9-e294-49be-95da-c01b3eec7bf9"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Event Count Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "4": {
            "position": {
              "x": 12,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "// log type count\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| summarize LogTypeCount= count() by LogType \n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "LogType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "LogTypeCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "8c4bdd63-3db8-4c6f-8479-2e730f87ad1e"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Event Type Summary",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "5": {
            "position": {
              "x": 0,
              "y": 5,
              "colSpan": 18,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Malware Posture In Environment</div> ",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "6": {
            "position": {
              "x": 0,
              "y": 6,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top 5 malware seen\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| where LogType ==\"Threat\"\n| extend MalwareMD5= extract(\"MD5: (.*?),\",1,SyslogMessage) \n| summarize MalwareCount= count() by MalwareMD5\n| top 5 by MalwareCount desc  \n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "a63faa99-b0b5-42c7-8e8f-7de3bca4391b"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Malwares Detected By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "7": {
            "position": {
              "x": 6,
              "y": 6,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Threat classification\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| where LogType ==\"Threat\"\n| extend Classification= extract(\"Threat Classification: (.*?)#\",1,SyslogMessage)\n| summarize count() by Classification \n| top 5 by count_ desc \n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "ac7b0173-e513-4388-a1cc-8cf5b7498893"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Malware Type By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "8": {
            "position": {
              "x": 12,
              "y": 6,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//how new is malware\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| where LogType ==\"Threat\"\n| extend Unique= extract(\"Is Unique To Cylance: (.*?),\",1,SyslogMessage)\n| summarize count() by Unique \n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "8e4ef54c-4a1f-4101-a8eb-390059b26332"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Is This First Time Cylance Has Seen This Malware?",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "9": {
            "position": {
              "x": 0,
              "y": 10,
              "colSpan": 18,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Threat Posture In Environment</div> ",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "10": {
            "position": {
              "x": 0,
              "y": 11,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Detected By\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| where LogType ==\"Threat\"\n| extend DetectionMethod= extract(\"Detected By: (.*?),\",1,SyslogMessage)\n| summarize count() by DetectionMethod\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "106a734c-1b9a-44e9-8541-b4b2b1f787fb"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Cylance Threat Count by Feature ",
                  "PartSubTitle": "{Workspace_Name}",
                  "Query": "//Detected By\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| where LogType ==\"Threat\"\n| extend DetectionMethod= extract(\"Detected By: (.*?),\",1,SyslogMessage)\n| summarize Count=count() by DetectionMethod\n"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "11": {
            "position": {
              "x": 6,
              "y": 11,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Count by status\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| where LogType ==\"Threat\"\n| extend CylanceStatus= extract(\"Status: (.*?),\",1,SyslogMessage)\n| summarize count() by CylanceStatus \n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "636dd1a9-1304-4da0-9a4b-fdd8d734bfda"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Clyance Threat Status Summary",
                  "PartSubTitle": "{Workspace_Name}",
                  "Query": "//Count by status\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| where LogType ==\"Threat\"\n| extend CylanceStatus= extract(\"Status: (.*?),\",1,SyslogMessage)\n| summarize StatusCount=count() by CylanceStatus \n"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "12": {
            "position": {
              "x": 12,
              "y": 11,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//threat type make pie chart\r\nSyslog\r\n| where Computer == \"sysloghost\"\r\n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \r\n| where LogType ==\"Threat\"\r\n| extend EventName = extract(\"Event Name: (.*?),\",1,SyslogMessage ) \r\n| summarize EventType= count() by EventName\r\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "EventName",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "EventType",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "ab497652-b6c8-46c9-be16-fd656372373c"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Threat Event Summary",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "13": {
            "position": {
              "x": 0,
              "y": 15,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top 5 device in threat\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| where LogType ==\"Threat\"\n| extend DeviceName = extract(\"Device Name: (.*?),\",1,SyslogMessage)\n| where DeviceName != \"\"\n| summarize DeviceCount=count() by DeviceName\n| top 5 by DeviceCount desc \n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "fe52d69e-369f-4ec0-9210-1860baa3c55a"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Devices With Threats By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "14": {
            "position": {
              "x": 6,
              "y": 15,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//unsafe count by device\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| where LogType ==\"Threat\"\n| extend CylanceStatus= extract(\"Status: (.*?),\",1,SyslogMessage)\n| where CylanceStatus ==\"Unsafe\"\n| extend DeviceName = extract(\"Device Name: (.*?),\",1,SyslogMessage)\n| summarize count() by DeviceName \n| top 5 by count_ desc nulls last \n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "55fb4a5b-a9ce-4d64-9db4-1e113859f4ff"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Devices With Unsafe Threats By Count",
                  "PartSubTitle": "{Workspace_Name}",
                  "Query": "//unsafe count by device\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| where LogType ==\"Threat\"\n| extend CylanceStatus= extract(\"Status: (.*?),\",1,SyslogMessage)\n| where CylanceStatus ==\"Unsafe\"\n| extend DeviceName = extract(\"Device Name: (.*?),\",1,SyslogMessage)\n| summarize StatusCount=count() by DeviceName \n| top 5 by StatusCount nulls last \n"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "15": {
            "position": {
              "x": 12,
              "y": 15,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//malware type pie chart\r\nSyslog\r\n| where Computer == \"sysloghost\" \r\n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \r\n| where LogType ==\"Threat\"\r\n| extend FileType= extract(\"File Type: (.*?),\",1,SyslogMessage)\r\n| summarize FileTypeCount=count() by  FileType\r\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "FileType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "FileTypeCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "4ec2c57b-16a4-4632-846f-e83c33c10e6f"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "File Type Associated With Threat By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "16": {
            "position": {
              "x": 0,
              "y": 19,
              "colSpan": 18,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Cylance Mangement</div> \n",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "17": {
            "position": {
              "x": 0,
              "y": 20,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Audit logs type\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| where LogType ==\"AuditLog\"\n| extend EventName = extract(\"Event Name: (.*?),\",1,SyslogMessage ) \n| summarize EventType= count() by EventName\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "3a902863-3cfc-41af-9832-bc18926c22bd"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Audit Event Summary",
                  "PartSubTitle": "{Workspace_Name}",
                  "Query": "//Audit logs type\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| where LogType ==\"AuditLog\"\n| extend EventName = extract(\"Event Name: (.*?),\",1,SyslogMessage ) \n| summarize EventCount= count() by EventName\n"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "18": {
            "position": {
              "x": 6,
              "y": 20,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Agent Version Across\r\nSyslog\r\n| where Computer == \"sysloghost\" \r\n| extend AgentVersion= extract(\"Agent Version: (.*?),\",1,SyslogMessage)\r\n| where AgentVersion !=\"\"\r\n| extend DeviceName = extract(\"Device Name: (.*?),\",1,SyslogMessage)\r\n| summarize DeviceCount=dcount(DeviceName) by AgentVersion \r\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "591a1ebd-822d-4188-a3f8-63fe9d376c77"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Agent Version Summary",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "19": {
            "position": {
              "x": 12,
              "y": 20,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//device logs\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| where LogType ==\"Device\"\n| extend EventName = extract(\"Event Name: (.*?),\",1,SyslogMessage ) \n| summarize EventType= count() by EventName\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/CylanceDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "1dc8e02e-d322-45fd-800e-07c9f889d64b"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Device Event Summary",
                  "PartSubTitle": "{Workspace_Name}",
                  "Query": "//device logs\nSyslog\n| where Computer == \"sysloghost\" \n| extend LogType= extract(\"^([a-xA-Z]*),\",1,SyslogMessage ) \n| where LogType ==\"Device\"\n| extend EventName = extract(\"Event Name: (.*?),\",1,SyslogMessage ) \n| summarize EventCount= count() by EventName\n"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "20": {
            "position": {
              "x": 0,
              "y": 0,
              "colSpan": 1,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [
                {
                  "name": "subscriptionId",
                  "value": "{Subscription_Id}"
                },
                {
                  "name": "resourceGroup",
                  "value": "{Resource_Group}"
                },
                {
                  "name": "workspaceName",
                  "value": "{Workspace_Name}"
                }
              ],
              "type": "Extension/Microsoft_Azure_Security_Insights/PartType/AsiOverviewPart",
              "defaultMenuItemId": "0"
            }
          }
        }
      }
    }
  }
},{
  "name": "DnsDashboard_{Workspace_Name}",
  "type": "Microsoft.Portal/dashboards",
  "location": "{Dashboard_Location}",
  "tags": {
    "addonKey": "DnsDashboard",
    "hidden-title": "DNS - {Workspace_Name}",
    "version": "1.0",
    "workspaceName": "{Workspace_Name}"
  },
  "properties": {
    "lenses": {
      "0": {
        "order": 0,
        "parts": {
          "0": {
            "position": {
              "x": 1,
              "y": 0,
              "colSpan": 23,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">DNS servers, Malicious traffic</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "1": {
            "position": {
              "x": 0,
              "y": 1,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "DnsInventory\n| where SubType == \"Server\"\n| project Computer, DomainName, ForestName, ServerIPs"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/DnsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "9fc81d6a-db59-4bac-b172-87cd541a6216"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Active DNS servers",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "2": {
            "position": {
              "x": 12,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "DnsEvents\n| where SubType == 'LookupQuery' and isnotempty(MaliciousIP)\n| summarize Attempts = count() by  Computer,RemoteIPCountry, IndicatorThreatType\n| order by Attempts desc"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/01970238-40bc-4830-b94e-1d162d1c45da"
                },
                {
                  "name": "PartId",
                  "value": "201e8880-1e04-474a-86eb-dfc5acb1aff1"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Malicious traffic",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "3": {
            "position": {
              "x": 18,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "DnsEvents\n| where SubType == 'LookupQuery' and isnotempty(MaliciousIP)\n| summarize Attempts = count() by ClientIP, MaliciousIP\n| project ClientIP , MaliciousIP, Attempts"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/DnsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "5693643d-721f-455b-971f-aefb76a5a058"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Malicious Traffic by Client IP, Attempts",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "4": {
            "position": {
              "x": 0,
              "y": 5,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">DNS Events Overview</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "5": {
            "position": {
              "x": 0,
              "y": 6,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "DnsEvents\n| summarize Events = count() by bin_at(TimeGenerated, 1h, now())\n| render timechart"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Events",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/DnsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "9f161269-de8d-49b7-9939-a40f3cad135e"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "DNS events per hour",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "6": {
            "position": {
              "x": 12,
              "y": 6,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "DnsEvents\n| summarize count()  by SubType\n| order by count_ desc \n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "SubType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/DnsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "c0447705-bb68-4381-a398-b8839d36657c"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "DNS events divided into SubType",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "7": {
            "position": {
              "x": 18,
              "y": 6,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "DnsEvents\n| extend type = case(\n    QueryType == \"A\", \"IPv4 address record\", \n    QueryType == \"AAAA\", \"IPv6 address record\",\n    QueryType == \"ANY\", \"All cached records\",\n    QueryType == \"CNAME\", \"Canonical name record\",\n    QueryType == \"MX\", \"Mail exchange record\",\n    QueryType == \"NS\", \"Name server record\",\n    QueryType == \"PTR\", \"Pointer record\",\n    QueryType == \"SIG\", \"Signature\",\n    QueryType == \"SOA\", \"Start of authority record\",\n    QueryType == \"SRV\", \"Service locator\",\n    QueryType == \"TXT\", \"Text record\",\n    strcat('Other'))\n| summarize count()  by type\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "type",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/DnsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "464ca10f-fb7c-410a-b8f8-730a3f711b65"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "DNS events divided into query type",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "8": {
            "position": {
              "x": 0,
              "y": 10,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Domains Overview</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "9": {
            "position": {
              "x": 0,
              "y": 11,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "DnsEvents\n| where SubType == \"LookupQuery\" \n| summarize Domains = dcount(Name) by bin_at(TimeGenerated, 1h, now())"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Domains",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/DnsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "0fc7b6c7-2670-4aa5-8981-8b81a43b902e"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Unique number of domains queried",
                  "PartSubTitle": "Per hour"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "10": {
            "position": {
              "x": 12,
              "y": 11,
              "colSpan": 3,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "DnsEvents\n|where SubType == \"LookupQuery\" \n| summarize count() by Name\n| order by count_ desc \n| project Domain = Name , Queries=count_ "
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/DnsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "77ecb703-b938-4792-ac1f-d7d6c3169af7"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top domains queried",
                  "PartSubTitle": "Including amount of queries"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "11": {
            "position": {
              "x": 15,
              "y": 11,
              "colSpan": 9,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "DnsEvents\n| extend NameParts = split(Name,'.')\n//Break the domain into its parts\n| extend Top_Level_Domain =  strcat(NameParts[toint(array_length(NameParts)-2)],'.',NameParts[toint(array_length(NameParts)-1)] )\n//Use the rightmost parts of the URL\n| extend Top_Level_Domain = iif(strlen(Top_Level_Domain)<7,strcat(NameParts[toint(array_length(NameParts)-3)],'.',Top_Level_Domain),Top_Level_Domain)\n//If the two right most parts are too short (e.g. \"co.uk\" or \"com.tr\", add another part\n| summarize SubDomainCount = count() by Top_Level_Domain, Name\n| join kind= inner\n(\n    DnsEvents\n    | extend NameParts = split(Name,'.')\n    //Break the domain into its parts\n    | extend Top_Level_Domain =  strcat(NameParts[toint(array_length(NameParts)-2)],'.',NameParts[toint(array_length(NameParts)-1)] )\n    //Use the rightmost parts of the URL\n    | extend Top_Level_Domain = iif(strlen(Top_Level_Domain)<7,strcat(NameParts[toint(array_length(NameParts)-3)],'.',Top_Level_Domain),Top_Level_Domain)\n    //If the two right most parts are too short (e.g. \"co.uk\" or \"com.tr\", add another part\n    | summarize Total_Sub_Domains = count() by Top_Level_Domain\n)\non Top_Level_Domain\n| extend pk = SubDomainCount/todouble(Total_Sub_Domains)\n| extend h1= -log2(pk)*pk\n//calculate entropy according to Sannon function https://en.wiktionary.org/wiki/Shannon_entropy\n| summarize Sub_Domain_Entropy = sum(h1), Total_Sub_Domains = any(Total_Sub_Domains) ,makelist(Name)  by Top_Level_Domain\n| order by Sub_Domain_Entropy desc"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/DnsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "a1bce717-3de7-4612-99fc-14903f407339"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Domain entropy ",
                  "PartSubTitle": "Name, Entropy Score, Number Of Domains, "
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "12": {
            "position": {
              "x": 0,
              "y": 15,
              "colSpan": 12,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Lookup Queries</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "13": {
            "position": {
              "x": 12,
              "y": 15,
              "colSpan": 6,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Configoration Queries</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "14": {
            "position": {
              "x": 18,
              "y": 15,
              "colSpan": 6,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Dynamic Registration</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "15": {
            "position": {
              "x": 0,
              "y": 16,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "DnsEvents\n| where SubType == \"LookupQuery\"\n| summarize count() by ClientIP\n| order by count_ desc\n| project IP = ClientIP , Queries=count_\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "IP",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "Queries",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/DnsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "4676c2ab-ff67-4202-b2cc-1791c2ad62bf"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Queries by client IP",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "16": {
            "position": {
              "x": 6,
              "y": 16,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "DnsEvents\n| where SubType == \"LookupQuery\"\n| extend Reasons = case(\n    ResultCode == 0, \"No Error\",\n    ResultCode == 1, \"Format Error\",\n    ResultCode == 2, \"Server Failure\",\n    ResultCode == 3, \"Non-Existent Domain\",\n    ResultCode == 4, \"Not Implemented\",\n    ResultCode == 5, \"Query Refused\",\n    ResultCode == 6, \"Name Exists when it should not\",\n    ResultCode == 7, \"RR Set Exists when it should not\",\n    ResultCode == 8, \"RR Set that should exist does not\",\n    ResultCode == 9, \"Server Not Authoritative for zone\",\n    ResultCode == 10, \"Name not contained in zone\",\n    ResultCode == 16, \"TSIG Signature Failure\",\n    ResultCode == 17, \"Key not recognized\",\n    ResultCode == 18, \"Signature out of time window\",\n    ResultCode == 19, \"Bad TKEY Mode\",\n    ResultCode == 20, \"Duplicate key name\",\n    ResultCode == 21, \"Algorithm not supported\",\n    ResultCode == 22, \"Bad Truncation\",\n    ResultCode == 23, \"Bad/missing Server Cookie\",\n    strcat('Other', ResultCode))\n| summarize count() by Reasons"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Reasons",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/DnsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "a49a050a-ea6f-4b43-a255-fea6dc2cf925"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Queries by result codes returned",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "17": {
            "position": {
              "x": 12,
              "y": 16,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//DNS Configuration Events\nDnsEvents\n| where SubType == \"ConfigurationChange\"\n| project TimeGenerated, Category = TaskCategory, Event_ID = EventId"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/DnsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "724ac038-d40b-409d-a7ab-988be6f3d47a"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "DNS configuration events",
                  "PartSubTitle": "Time, Category, Event ID"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "18": {
            "position": {
              "x": 18,
              "y": 16,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "DnsEvents\n| where SubType == \"DynamicRegistration\"\n| summarize count() by Result\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Result",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/DnsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "29c7a67a-a7b2-4dfb-b1a6-7ab5448a0ec9"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Dynamic registration events",
                  "PartSubTitle": "Fail VS Success"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "19": {
            "position": {
              "x": 0,
              "y": 0,
              "colSpan": 1,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [
                {
                  "name": "subscriptionId",
                  "value": "{Subscription_Id}"
                },
                {
                  "name": "resourceGroup",
                  "value": "{Resource_Group}"
                },
                {
                  "name": "workspaceName",
                  "value": "{Workspace_Name}"
                }
              ],
              "type": "Extension/Microsoft_Azure_Security_Insights/PartType/AsiOverviewPart",
              "defaultMenuItemId": "0"
            }
          }
        }
      }
    }
  }
},{
  "name": "ExchangeOnlineDashboard_{Workspace_Name}",
  "type": "Microsoft.Portal/dashboards",
  "location": "{Dashboard_Location}",
  "tags": {
    "addonKey": "ExchangeOnlineDashboard",
    "hidden-title": "Exchange Online - {Workspace_Name}",
    "version": "1.0",
    "workspaceName": "{Workspace_Name}"
  },
  "properties": {
    "lenses": {
      "0": {
        "order": 0,
        "parts": {
          "0": {
            "position": {
              "x": 1,
              "y": 0,
              "colSpan": 17,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Mailbox Logins</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "1": {
            "position": {
              "x": 18,
              "y": 0,
              "colSpan": 6,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Users Activity</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "2": {
            "position": {
              "x": 0,
              "y": 1,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Mailbox Logins by hour\nOfficeActivity\n| where OfficeWorkload == \"Exchange\" and Operation == \"MailboxLogin\"\n| summarize Logins = count() by bin_at(TimeGenerated, 1h, now())\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Logins",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/ExchangeOnlineDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "d11717df-99bd-48ee-9e9b-2d2a341f7365"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Mailbox logins by hour",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "3": {
            "position": {
              "x": 12,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//The type of mailbox access. (type of user who accessed the mailbox)\r\nOfficeActivity\r\n| where OfficeWorkload == \"Exchange\" and Operation == \"MailboxLogin\"\r\n| summarize count() by Logon_Type\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Logon_Type",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/ExchangeOnlineDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "bdc89c9b-4b11-4b59-8b2c-054cac414964"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Mailbox logins by user type",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "4": {
            "position": {
              "x": 18,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\n| where OfficeWorkload == \"Exchange\"\n| summarize Amount = count() by UserId\n| top 10 by Amount"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/ExchangeOnlineDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "f5aa2ea8-3d95-4ac7-8a1e-16eedf713d7d"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 10 users",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "5": {
            "position": {
              "x": 0,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">New Mailboxes Created</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "6": {
            "position": {
              "x": 6,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Mailbox Permissions</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "7": {
            "position": {
              "x": 12,
              "y": 5,
              "colSpan": 12,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Suspicious operations</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "8": {
            "position": {
              "x": 0,
              "y": 6,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\r\n| where OfficeWorkload == \"Exchange\" and Operation == \"Set-Mailbox\"\r\n| project TimeGenerated , Operation , UserId , UserType \r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/ExchangeOnlineDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "f4cb8b64-4411-4f68-aa11-fbedc110fd69"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "New mailboxes",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "9": {
            "position": {
              "x": 6,
              "y": 6,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Mailbox permissions changes\nOfficeActivity\n| where OfficeWorkload == \"Exchange\" and Operation in (\"Add-MailboxPermission\", \"UpdateFolderPermissions\", \"Remove-MailboxPermission\")\n| summarize count() by Operation"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Operation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/ExchangeOnlineDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "f6e4f3bd-043b-4b57-a9f5-45d2952d2671"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Mailbox permissions changes",
                  "PartSubTitle": "by type of change"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "10": {
            "position": {
              "x": 12,
              "y": 6,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Exchange operations that are performed by actors outside your organization - external\nOfficeActivity\n| where OfficeWorkload == \"Exchange\"\n| where ExternalAccess == \"True\" \n| summarize count() by Operation\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Operation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/ExchangeOnlineDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "10ee2ef8-774a-490d-b3ef-8587286f9242"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "External access operations by operation",
                  "PartSubTitle": "(operations that are performed by actors outside your organization)"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "11": {
            "position": {
              "x": 18,
              "y": 6,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Hard delete operations over time\nOfficeActivity\n| where OfficeWorkload == \"Exchange\" and Operation contains \"HardDelete\"\n| summarize count() by bin_at(TimeGenerated, 1h, now()), Operation "
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Operation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/ExchangeOnlineDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "01c85bd3-2270-4536-b128-6a901d28f009"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Hard Delete operations",
                  "PartSubTitle": "over time"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "12": {
            "position": {
              "x": 0,
              "y": 10,
              "colSpan": 6,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Operations by User Types</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "13": {
            "position": {
              "x": 6,
              "y": 10,
              "colSpan": 6,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Admin Operations by Type</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "14": {
            "position": {
              "x": 0,
              "y": 11,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\r\n| where OfficeWorkload == \"Exchange\"\r\n| summarize count() by UserType\r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "UserType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/ExchangeOnlineDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "84a205cf-9e9c-4a42-861c-d5d320efa707"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Operations by user type",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "15": {
            "position": {
              "x": 6,
              "y": 11,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\r\n| where OfficeWorkload == \"Exchange\" and UserType == \"Admin\"\r\n| summarize count() by Operation\r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Operation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/ExchangeOnlineDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "fab9f64c-02f1-464a-81de-950b3bbf61cf"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Admin operations by type",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "16": {
            "position": {
              "x": 0,
              "y": 0,
              "colSpan": 1,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [
                {
                  "name": "subscriptionId",
                  "value": "{Subscription_Id}"
                },
                {
                  "name": "resourceGroup",
                  "value": "{Resource_Group}"
                },
                {
                  "name": "workspaceName",
                  "value": "{Workspace_Name}"
                }
              ],
              "type": "Extension/Microsoft_Azure_Security_Insights/PartType/AsiOverviewPart",
              "defaultMenuItemId": "0"
            }
          }
        }
      }
    }
  }
},{
  "name": "FortiGateDashboard_{Workspace_Name}",
  "type": "Microsoft.Portal/dashboards",
  "location": "{Dashboard_Location}",
  "tags": {
    "addonKey": "FortiGateDashboard",
    "hidden-title": "FortiGate - {Workspace_Name}",
    "version": "1.0",
    "workspaceName": "{Workspace_Name}"
  },
  "properties": {
    "lenses": {
      "0": {
        "order": 0,
        "parts": {
          "0": {
            "position": {
              "x": 1,
              "y": 0,
              "colSpan": 12,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">FortiGate Overview</div>  ",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "1": {
            "position": {
              "x": 13,
              "y": 0,
              "colSpan": 11,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<img width='500' height='50' src='http://ccsethiopia.com/images/partners/partner6.png'/> \r\n \r\n",
                    "title": "",
                    "subtitle": "My subtitle"
                  }
                }
              }
            }
          },
          "2": {
            "position": {
              "x": 0,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Count by System Events\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| summarize NumberOfEvent=count() by Activity\n| extend Category= extract(\"(.*):(.*)$\",1,Activity)\n| extend B= extract(\"(.*):(.*$)\",2,Activity)\n| extend SubCategory= extract(\"([a-zA-Z/-]*).*$\",1,B)\n| extend SubType= extract(\"([a-zA-Z/-]*) (.*)$\",2,B)\n| where SubCategory contains \"system\" and SubType !in (\"\",\"perf-stats\")\n| project SubType, NumberOfEvent"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "SubType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "NumberOfEvent",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "6a77821f-3972-4e6b-a777-4212807107e5"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": " System Events Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "3": {
            "position": {
              "x": 6,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Logs Received By time \r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\" \r\n| where DeviceProduct == \"Fortigate\" \r\n| summarize LogsCount=count() by TimeGenerated \n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "LogsCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "a66bdc20-ceff-41c6-a8ba-ba730cc5240b"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Event Count Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "4": {
            "position": {
              "x": 12,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Total Traffic Sent vs Received in Mega Bytes\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\" \r\n| where DeviceProduct == \"Fortigate\"\r\n| summarize SentDataMB = sum(SentBytes)/1048576 , DataRecievedMB =sum(ReceivedBytes)/1048576 by TimeGenerated\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "SentDataMB",
                        "type": "Int64"
                      },
                      {
                        "name": "DataRecievedMB",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "2c5452b7-f0c1-4553-8938-13721ab8b894"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Data Flow Volume Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "5": {
            "position": {
              "x": 18,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Total Forward Traffic Sent vs Received\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| summarize SentDataMB = sumif(SentBytes,Activity contains \"forward\" )/1048576 , DataRecievedMB =sumif(ReceivedBytes, Activity contains \"forward\")/1048576 by TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "SentDataMB",
                        "type": "Int64"
                      },
                      {
                        "name": "DataRecievedMB",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "91b58974-af45-41b0-a768-63f08fd174f5"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Forward Data Flow Volume Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "6": {
            "position": {
              "x": 0,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//By severity\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| summarize SeverityCount=count() by LogSeverity , TimeGenerated"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "SeverityCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "LogSeverity",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "5ae22484-b0f6-4736-9668-7d9a60f2c0ce"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Event Severity Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "7": {
            "position": {
              "x": 6,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//System Add Vs Delete Vs Edit Vs Move\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| where Activity contains \"system\"\n| where Activity contains \"add\" or Activity contains \"delete\" or Activity contains \"move\" or Activity contains \"edit\"\n| summarize EventCount = count() by Activity\n| extend Category= extract(\"(.*):(.*)$\",1,Activity)\n| extend B= extract(\"(.*):(.*$)\",2,Activity)\n| extend SubCategory= extract(\"([a-zA-Z/-]*).*$\",1,B)\n| extend SubType= extract(\"([a-zA-Z/-]*) (.*)$\",2,B)\n| project SubType , EventCount"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "SubType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "EventCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "534c3f7a-fbbc-4068-9fe4-a5ef5e714529"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "System Event Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "8": {
            "position": {
              "x": 12,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Category By time\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| extend Category=extract(\"(.*?):(.*?)$\",1,Activity )\n| summarize CatgoryCount=count() by Category, TimeGenerated"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "CatgoryCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Category",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "3ae780b1-a910-4380-a8c0-83a2d72843ad"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Category Count Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "9": {
            "position": {
              "x": 18,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Total Local Traffic Sent vs Received\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| summarize SentDataMB = sumif(SentBytes,Activity contains \"local\" )/1048576 , DataRecievedMB =sumif(ReceivedBytes, Activity contains \"local\")/1048576 by TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "SentDataMB",
                        "type": "Int64"
                      },
                      {
                        "name": "DataRecievedMB",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "ae0720cb-92b8-418b-ac44-1387285a92c2"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Local Data Flow Volume Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "10": {
            "position": {
              "x": 0,
              "y": 9,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Count by Traffic Forward Events\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| summarize NumberOfEvent=count() by Activity\n| extend Category= extract(\"(.*):(.*)$\",1,Activity)\n| extend B= extract(\"(.*):(.*$)\",2,Activity)\n| extend SubCategory= extract(\"([a-zA-Z/-]*).*$\",1,B)\n| extend SubType= extract(\"([a-zA-Z/-]*) (.*)$\",2,B)\n| where SubCategory contains \"forward\" and SubType !in (\"start\",\"close\")\n| project SubType, NumberOfEvent"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "SubType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "NumberOfEvent",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "0f001300-65d2-43d3-a060-d24a8d0051db"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Traffic Forward Events Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "11": {
            "position": {
              "x": 6,
              "y": 9,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//local vs Forwarded log count\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| summarize NumberOfEvent=count() by Activity\n| extend Category= extract(\"(.*):(.*)$\",1,Activity)\n| extend B= extract(\"(.*):(.*$)\",2,Activity)\n| extend SubCategory= extract(\"([a-zA-Z/-]*).*$\",1,B)\n| extend SubType= extract(\"([a-zA-Z/-]*) (.*)$\",2,B)\n| where Category contains \"traffic\"\n| project SubCategory , NumberOfEvent\n| summarize Total= sum(NumberOfEvent) by SubCategory"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "SubCategory",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "Total",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "745f0d7c-2edd-4612-897a-1d0514cf10f7"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Traffic Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "12": {
            "position": {
              "x": 12,
              "y": 9,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Forward Traffic by Allow vs Deny\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| where Activity contains \"traffic:forward accept\" or Activity contains \"traffic:forward deny\"\n| summarize TrafficCount= count() by Activity, TimeGenerated"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "TrafficCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Activity",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "b6c5944c-b585-4770-be72-b54205a90336"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Forward Traffic Count Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "13": {
            "position": {
              "x": 0,
              "y": 13,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Web-Filter</div> ",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "14": {
            "position": {
              "x": 0,
              "y": 14,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//data upload by category\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\" \r\n| where DeviceProduct == \"Fortigate\"\r\n| where RequestContext != \"\" \r\n| where Activity contains \"passthrough\"\r\n| summarize DataSentMB=sum(SentBytes)/1048576 by  RequestContext\r\n| top 5 by DataSentMB  desc \n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "RequestContext",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "DataSentMB",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "90cf63b0-4a7b-4502-b4bf-a0fefd051925"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Category By  Data Upload Volume",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "15": {
            "position": {
              "x": 6,
              "y": 14,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 URL Blocked\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"utm:webfilter\"\r\n| extend Url= extract(\";FortinetFortiGatehostname=(.*?);\",1,AdditionalExtensions)\r\n| extend Action= extract(\";FortinetFortiGateaction=(.*?);\",1,AdditionalExtensions)\r\n| where Action ==\"blocked\"\r\n| summarize Count= count() by Url\r\n| top 5 by Count desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "ae1fcd60-e122-4339-a205-c66b0789d272"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 URL Blocked",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "16": {
            "position": {
              "x": 12,
              "y": 14,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 URL Data Upload\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"passthrough\"\r\n| extend Url= extract(\";FortinetFortiGatehostname=(.*?);\",1,AdditionalExtensions)\r\n| summarize DataSent = sum(SentBytes) by Url\r\n| top 5 by DataSent desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "8909329a-c0f5-4e71-a675-9046af8d218a"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 URLs By Data Upload Volume",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "17": {
            "position": {
              "x": 18,
              "y": 14,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Count by webfilter\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| summarize NumberOfEvent=count() by Activity\n| extend Category= extract(\"(.*):(.*)$\",1,Activity)\n| extend B= extract(\"(.*):(.*$)\",2,Activity)\n| extend SubCategory= extract(\"([a-zA-Z/-]*).*$\",1,B)\n| extend SubType= extract(\"([a-zA-Z/-]*) (.*)$\",2,B)\n| where SubCategory contains \"webfilter\"\n| project SubType, NumberOfEvent\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "SubType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "NumberOfEvent",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "0a464921-7cc5-46d0-b66e-db81bb0fa82b"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Web-filter Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "18": {
            "position": {
              "x": 0,
              "y": 18,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Web Category Blocked\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"utm:webfilter\"\r\n| extend Url= extract(\";FortinetFortiGatehostname=(.*?);\",1,AdditionalExtensions)\r\n| extend Action= extract(\";FortinetFortiGateaction=(.*?);\",1,AdditionalExtensions)\r\n| where Action ==\"blocked\"\r\n| where RequestContext != \"\"\r\n| summarize Count= count() by RequestContext\r\n| top 5 by Count desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "e80b49ea-88ca-451d-823d-cf1d778edc22"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Web Category Blocked",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "19": {
            "position": {
              "x": 6,
              "y": 18,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Category Data Download\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"passthrough\"\r\n| where RequestContext != \"\"\r\n| summarize DataRecievedMB=sum(ReceivedBytes)/1048576 by  RequestContext\r\n| top 5 by DataRecievedMB desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "726d6f87-8731-49f6-98fb-d6f9f57d5895"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Category By Data Download Volume",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "20": {
            "position": {
              "x": 0,
              "y": 22,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Top 5 IP Address By Data</div>  ",
                    "title": "",
                    "subtitle": "My subtitle"
                  }
                }
              }
            }
          },
          "21": {
            "position": {
              "x": 0,
              "y": 23,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Outbound Source IP Data Upload\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"forward\"\r\n| where DeviceInboundInterface == \"port2\"\r\n| summarize DataSentMB= sum(SentBytes)/1048576 by SourceIP\r\n| top 5 by DataSentMB desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "6fbdb0bc-38b1-4dd7-9b82-4e8c688f9e1e"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Source IP Addresses By Data Upload Volume",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "22": {
            "position": {
              "x": 6,
              "y": 23,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Outbound Destination by Data Sent\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"forward\"\r\n| where DeviceInboundInterface == \"port2\"\r\n| summarize DataSentMB= sum(SentBytes)/1048576 by DestinationIP\r\n| top 5 by DataSentMB desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "c5069a1a-2470-434a-827d-ba62c2724a6d"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Destination IP Addresses By Data Sent Volume",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "23": {
            "position": {
              "x": 12,
              "y": 23,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Destination Inbound IP Address Data Received\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"forward\"\r\n| where DestinationTranslatedAddress != \"\"\r\n| where DeviceInboundInterface == \"port1\"\r\n| summarize DataReceivedMB= sum(ReceivedBytes)/1048576 by DestinationTranslatedAddress\r\n| project-rename InboundDestination= DestinationTranslatedAddress\r\n| top 5 by DataReceivedMB  desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "e7a198fe-9956-4cf4-a811-86c2d055efed"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Inbound Destination IP Addresses By Data Received Volume",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "24": {
            "position": {
              "x": 18,
              "y": 23,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Inbound Source Data Received\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"forward\"\r\n| where DeviceInboundInterface == \"port1\"\r\n| summarize DataSent= sum(ReceivedBytes) by SourceIP\r\n| top 5 by DataSent desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "e7b529ad-83c1-46aa-8cac-7439a9f30929"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Inbound Source IP Addresses By Data Received Volume",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "25": {
            "position": {
              "x": 0,
              "y": 27,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Top 5 Ports</div>  \n \n",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "26": {
            "position": {
              "x": 0,
              "y": 28,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Destination ports for outbound Traffic\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| where Activity contains \"forward\"\n| where DeviceInboundInterface == \"port2\"\n| where DestinationPort > 0\n| extend DestinationPorts= tostring(DestinationPort)\n| summarize TopDestinationPortsCount= count() by DestinationPorts\n| top 5 by TopDestinationPortsCount desc"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "DestinationPorts",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "TopDestinationPortsCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "3b06bf0b-f848-4880-9ee1-78bb49d33432"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Destination Ports",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "27": {
            "position": {
              "x": 12,
              "y": 28,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Destination ports for Inbound Traffic\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| where Activity contains \"forward\"\n| where DeviceInboundInterface == \"port1\"\n| where DestinationPort > 0\n| extend DestinationPorts= tostring(DestinationPort)\n| summarize TopDestinationPortsCount= count() by DestinationPorts\n| top 5 by TopDestinationPortsCount  desc"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "DestinationPorts",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "TopDestinationPortsCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "190403c1-f56b-42d3-9696-374155e4490a"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Inbound Destination Ports",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "28": {
            "position": {
              "x": 0,
              "y": 32,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Top 5 IP Address</div>  ",
                    "title": "",
                    "subtitle": "My subtitle"
                  }
                }
              }
            }
          },
          "29": {
            "position": {
              "x": 0,
              "y": 33,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Inbound Source IP\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"forward\"\r\n| where DeviceInboundInterface == \"port2\"\r\n| summarize InBoundCount= count() by SourceIP\r\n| top 5 by InBoundCount desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "59d813f3-c722-4807-bacf-a5d18221ebf5"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Inbound Source IP Addresses",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "30": {
            "position": {
              "x": 6,
              "y": 33,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Outbound Source IP\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"forward\"\r\n| where DeviceInboundInterface == \"port1\"\r\n| summarize OutBoundCount= count() by SourceIP\r\n| top 5 by OutBoundCount desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "33a934e1-def5-48ea-8aa9-b94fd24cdb21"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Source IP Addresses",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "31": {
            "position": {
              "x": 12,
              "y": 33,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Inbound Destination IP\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"forward\"\r\n| where DeviceInboundInterface == \"port1\"\r\n| where DestinationTranslatedAddress contains \".\"\r\n| summarize InBoundCount= count() by DestinationTranslatedAddress\r\n| project-rename DestinationIP= DestinationTranslatedAddress\r\n| top 5 by InBoundCount desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "fc703510-4c1d-4468-85e1-e6488298a7af"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Inbound Destination IP Addresses",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "32": {
            "position": {
              "x": 18,
              "y": 33,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Outbound Destination IP\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"forward\"\r\n| where DeviceInboundInterface == \"port2\"\r\n| summarize OutBoundCount= count() by DestinationIP\r\n| top 5 by OutBoundCount desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "27ef8765-d021-43fa-b048-25aa4bb28d69"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Destination IP Addresses",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "33": {
            "position": {
              "x": 0,
              "y": 37,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Firewall Management</div> ",
                    "title": "",
                    "subtitle": "My subtitle"
                  }
                }
              }
            }
          },
          "34": {
            "position": {
              "x": 0,
              "y": 38,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top 5 successful logins\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| where DestinationUserName != \"\"\n| where Activity == \"event:system login success\"\n| summarize Attempts=count() by DestinationUserName\n| project-rename UserName= DestinationUserName\n| top 5 by Attempts desc\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "UserName",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "Attempts",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "96a90ac9-60b6-4081-bb91-bbae42401ee3"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Successful Logins By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "35": {
            "position": {
              "x": 6,
              "y": 38,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top 5 Failed logins\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| where DestinationUserName != \"\"\n| where Activity == \"event:system login failed\"\n| summarize Attempts=count() by DestinationUserName\n| project-rename UserName= DestinationUserName\n| top 5 by Attempts desc\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "UserName",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "Attempts",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "361e45ed-a19b-4176-b437-6cb135b09e87"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Failed Logins By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "36": {
            "position": {
              "x": 12,
              "y": 38,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//FortiGate Update Summary\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"system\"\r\n| where Activity contains \"update\"\r\n| extend EventResult= extract(\";FortinetFortiGatelogdesc=(.*?);\",1, AdditionalExtensions)\r\n| summarize Count= count() by EventResult\r\n| top 5 by Count desc nulls last"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "2f732fd5-edca-43e6-97de-609a8e861f49"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "FortiGate Update Summary  By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "37": {
            "position": {
              "x": 18,
              "y": 38,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Firewall Config Edit Summary\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"system\"\r\n| where Activity contains \"edit\"\r\n| extend EditType= extract(\";FortinetFortiGatecfgpath=(.*?);\",1, AdditionalExtensions)\r\n| summarize EditCount= count() by EditType\r\n| top 5 by EditCount desc nulls last"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "66f17b6c-d1da-4bd4-9394-9aa1c9d5db9f"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Firewall Config Edit Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "38": {
            "position": {
              "x": 0,
              "y": 42,
              "colSpan": 18,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Avg Concurrent Conn\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| where Activity contains \"system\"\n| where Activity contains \"perf\"\n| extend ConcurrentSession= extract(\";FortinetFortiGatetotalsession=(.*?);\",1,AdditionalExtensions )\n| summarize  Sessions=avg(toint(ConcurrentSession)) by  TimeGenerated"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Sessions",
                        "type": "Double"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "224780ee-ebd3-4ab3-b21f-4fee344e72f9"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Average Concurrent Session Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "39": {
            "position": {
              "x": 18,
              "y": 42,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Count by Traffic Local Events\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| summarize NumberOfEvent=count() by Activity\n| extend Category= extract(\"(.*):(.*)$\",1,Activity)\n| extend B= extract(\"(.*):(.*$)\",2,Activity)\n| extend SubCategory= extract(\"([a-zA-Z/-]*).*$\",1,B)\n| extend SubType= extract(\"([a-zA-Z/-]*) (.*)$\",2,B)\n| where SubCategory contains \"local\" and SubType !in (\"start\",\"close\")\n| project SubType, NumberOfEvent"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "SubType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "NumberOfEvent",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "929b5a0b-b613-422b-92d1-4a76f7f5b9d4"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Local Traffic Events Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "40": {
            "position": {
              "x": 0,
              "y": 46,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">UTM</div>  \n \n",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "41": {
            "position": {
              "x": 0,
              "y": 47,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//UTM distribution\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| summarize NumberOfEvent=count() by Activity\n| extend Category= extract(\"(.*):(.*)$\",1,Activity)\n| extend B= extract(\"(.*):(.*$)\",2,Activity)\n| extend SubCategory= extract(\"([a-zA-Z/-]*).*$\",1,B)\n| extend SubType= extract(\"([a-zA-Z/-]*) (.*)$\",2,B)\n| where Category contains \"utm\"\n| project SubCategory , NumberOfEvent\n| summarize Total= sum(NumberOfEvent) by SubCategory"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "SubCategory",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "Total",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "e8d403fa-e25f-4607-aaf3-8108ad3a5b12"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "UTM Distribution Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "42": {
            "position": {
              "x": 6,
              "y": 47,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top Traffic Trend\r\nCommonSecurityLog\r\n| where DeviceVendor == \"Fortinet\"\r\n| where DeviceProduct == \"Fortigate\"\r\n| where Activity contains \"traffic\"\r\n| summarize ActivityCount=count() by Activity\r\n| extend ActivtyType=extract(\"traffic:(.*)$\",1,Activity)\r\n| project ActivtyType , ActivityCount\r\n| top 5 by ActivityCount desc"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "772518ba-08d3-4b87-a9c3-8517ee93c1a8"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": " Top Traffic Trend By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "43": {
            "position": {
              "x": 12,
              "y": 47,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Count by app-ctrl events\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| summarize NumberOfEvent=count() by Activity\n| extend Category= extract(\"(.*):(.*)$\",1,Activity)\n| extend B= extract(\"(.*):(.*$)\",2,Activity)\n| extend SubCategory= extract(\"([a-zA-Z/-]*).*$\",1,B)\n| extend SubType= extract(\"([a-zA-Z/-]*) (.*)$\",2,B)\n| where SubCategory contains \"app-ctrl\"\n| project SubType, NumberOfEvent"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "SubType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "NumberOfEvent",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "6c44a1a0-b8fa-42a2-ab45-7b32da4ecd9b"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "App-Ctrl Events Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "44": {
            "position": {
              "x": 18,
              "y": 47,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top protocol accepted\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| where ApplicationProtocol != \"\"\n| where Activity contains \"accept\"\n| summarize ProtocolCount = count() by ApplicationProtocol\n|top 5 by ProtocolCount desc nulls last"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "94c06651-d041-4a3e-a361-6f8c9c6f4c86"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Protocol Accepted",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "45": {
            "position": {
              "x": 0,
              "y": 51,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top protocol denied\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| where ApplicationProtocol != \"\"\n| where Activity contains \"deny\"\n| summarize ProtocolCount = count() by ApplicationProtocol\n|top 5 by ProtocolCount desc nulls last\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "ApplicationProtocol",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "ProtocolCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "0651fcf2-8921-43b7-897f-de77846d1370"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Protocol Blocked",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "46": {
            "position": {
              "x": 6,
              "y": 51,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "// Top category of data\nCommonSecurityLog\n| where DeviceVendor == \"Fortinet\"\n| where DeviceProduct == \"Fortigate\"\n| summarize count() by Activity\n| extend Category=extract(\"(.*?):(.*?)$\",1,Activity )\n| summarize CategoryCount=sum(count_) by Category"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Category",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "CategoryCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/FortiGateDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "2e683e01-188e-43df-a564-54879a2c5901"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top Traffic By Activity",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "47": {
            "position": {
              "x": 0,
              "y": 0,
              "colSpan": 1,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [
                {
                  "name": "subscriptionId",
                  "value": "{Subscription_Id}"
                },
                {
                  "name": "resourceGroup",
                  "value": "{Resource_Group}"
                },
                {
                  "name": "workspaceName",
                  "value": "{Workspace_Name}"
                }
              ],
              "type": "Extension/Microsoft_Azure_Security_Insights/PartType/AsiOverviewPart",
              "defaultMenuItemId": "0"
            }
          }
        }
      }
    }
  }
},{
  "name": "IdentityAndAccessDashboard_{Workspace_Name}",
  "type": "Microsoft.Portal/dashboards",
  "location": "{Dashboard_Location}",
  "tags": {
    "addonKey": "IdentityAndAccessDashboard",
    "hidden-title": "Identity & Access - {Workspace_Name}",
    "version": "1.0",
    "workspaceName": "{Workspace_Name}"
  },
  "properties": {
    "lenses": {
      "0": {
        "order": 0,
        "parts": {
          "0": {
            "position": {
              "x": 1,
              "y": 0,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">User Logons</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "1": {
            "position": {
              "x": 0,
              "y": 1,
              "colSpan": 7,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where EventID in (4624, 4625) and AccountType == 'User'\n| extend EventName = iff(EventID == 4624, \"Success\" , \"Fail\") \n| summarize NumLogons = count() by bin_at(TimeGenerated, 1h, now()), EventName"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "NumLogons",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "EventName",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/1c64bb6e-24b5-4e9f-8f7f-8e7c6c51f162"
                },
                {
                  "name": "PartId",
                  "value": "3890a09c-f87e-4e67-b4e2-78a71c2450bd"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"

                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Logons per hour ",
                  "PartSubTitle": "Fail VS Success"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "2": {
            "position": {
              "x": 7,
              "y": 1,
              "colSpan": 7,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "let top5 = SecurityEvent\n| where EventID == 4625 and AccountType == 'User'\n| extend Account_Name = extract(@\"^(.*\\\\)?([^@]*)(@.*)?$\", 2, tolower(Account))\n| summarize Attempts = count() by Account_Name\n| where Account_Name != \"\"\n| top 5 by Attempts \n| summarize makelist(Account_Name);\nSecurityEvent\n| where EventID == 4625 and AccountType == 'User'\n| extend Name = extract(@\"^(.*\\\\)?([^@]*)(@.*)?$\", 2, tolower(Account))\n| extend Account_Name = iff(Name in (top5), Name, \"Other\")\n| where Account_Name != \"\"\n| summarize Attempts = count() by Account_Name\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Account_Name",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "Attempts",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/IdentityAndAccessDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "ecfeb0d5-22d2-4635-899a-0a5d45e21e01"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"

                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Failure logon accounts",
                  "PartSubTitle": "Top 5 - by user names"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "3": {
            "position": {
              "x": 14,
              "y": 1,
              "colSpan": 13,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where EventID in (4625, 4624)\n| where TimeGenerated >= ago(14d)\n| summarize count() by bin_at(TimeGenerated, 1d, now())\n| extend Week = iff(TimeGenerated>=ago(7d), \"This Week\", \"Last Week\"), TimeGenerated = iff(TimeGenerated>=ago(7d), TimeGenerated, TimeGenerated + 7d)"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Week",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/IdentityAndAccessDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "1bc21a9a-00fc-4e12-ae96-2686c7fbb7c1"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Logons per day",
                  "PartSubTitle": "Week Over Week"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              },
              "filters": {
                "MsPortalFx_TimeRange": {
                  "model": {
                    "format": "utc",
                    "granularity": "auto",
                    "relative": "1d"
                  }
                }
              }
            }
          },
          "4": {
            "position": {
              "x": 0,
              "y": 5,
              "colSpan": 7,
              "rowSpan": 6
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where AccountType == \"User\"\n| where EventID in (4624, 4625)\n| summarize Unique_Accounts = dcount(Account), Attempts = count(), Succeeded=countif(EventID == 4624), Failed=countif(EventID == 4625)  by IpAddress\n| where Failed > 0\n| order by Succeeded>0, todouble(Succeeded)/Attempts asc, Attempts desc\n| project IP = IpAddress, Succeeded, Attempts, Unique_Accounts\n| take 10"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/1c64bb6e-24b5-4e9f-8f7f-8e7c6c51f162"
                },
                {
                  "name": "PartId",
                  "value": "00ee3d4f-a38f-4f06-8558-922a74e8ceba"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"

                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Most suspicious failed logons by IP",
                  "PartSubTitle": "Top 10"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "5": {
            "position": {
              "x": 7,
              "y": 5,
              "colSpan": 7,
              "rowSpan": 6
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where EventID in (4625, 4624) and AccountType == 'User'\n| extend AccountName = extract(@\"^(.*\\\\)?([^@]*)(@.*)?$\", 2, tolower(Account))\n| summarize Attempts = count(), Failed = countif(EventID == 4625), Succeeded = countif(EventID == 4624) by AccountName\n| where AccountName != \"\"\n| top 10 by Attempts\n| project Account_Name = AccountName, Attempts, Failed, Succeeded"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/1c64bb6e-24b5-4e9f-8f7f-8e7c6c51f162"
                },
                {
                  "name": "PartId",
                  "value": "54c9620b-b1b8-4bff-9d63-2753956b5488"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"

                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Logon attempts - Fail VS Success",
                  "PartSubTitle": " Top 10 - per user account name"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "6": {
            "position": {
              "x": 14,
              "y": 5,
              "colSpan": 7,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where EventID in (4624, 4625)\n| where AccountType == \"User\" \n| summarize Amount = count() by  LogonTypeName"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/IdentityAndAccessDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "21a79a90-ee2b-4d43-8509-7ebea3df95e4"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"

                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "User logons by type",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "7": {
            "position": {
              "x": 21,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where AccountType == 'User' and EventID == 4625\n| extend Reason = case(\n                        SubStatus == '0xc000005e', 'No logon servers available to service the logon request',\n                        SubStatus == '0xc0000062', 'Account name is not properly formatted',\n                        SubStatus == '0xc0000064', 'Account name does not exist',\n                        SubStatus == '0xc000006a', 'Incorrect password',\n                        SubStatus == '0xc000006d', 'Bad user name or password',\n                        SubStatus == '0xc000006f', 'User logon blocked by account restriction',\n                        SubStatus == '0xc000006f', 'User logon outside of restricted logon hours',\n                        SubStatus == '0xc0000070', 'User logon blocked by workstation restriction',\n                        SubStatus == '0xc0000071', 'Password has expired',\n                        SubStatus == '0xc0000072', 'Account is disabled',\n                        SubStatus == '0xc0000133', 'Clocks between DC and other computer too far out of sync',\n                        SubStatus == '0xc000015b', 'The user has not been granted the requested logon right at this machine',\n                        SubStatus == '0xc0000193', 'Account has expirated',\n                        SubStatus == '0xc0000224', 'User is required to change password at next logon',\n                        SubStatus == '0xc0000234', 'Account is currently locked out',\n                        strcat('Unknown reason substatus: ', SubStatus))\n| summarize count() by Reason\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Reason",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/IdentityAndAccessDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "fd748a71-fef1-4b96-b7d9-d74a2e47c2c7"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"

                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Failed user logons by reason",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "8": {
            "position": {
              "x": 14,
              "y": 9,
              "colSpan": 13,
              "rowSpan": 2
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where EventID == 4724 \n| summarize Resets = count() by bin_at(TimeGenerated, 1d, now())\n| render timechart \n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Resets",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/IdentityAndAccessDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "0f5f336f-15f1-46ef-92dc-33089a2d16c2"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"

                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Password reset",
                  "PartSubTitle": "Per day over last week"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "9": {
            "position": {
              "x": 0,
              "y": 11,
              "colSpan": 25,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Users Operations</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "10": {
            "position": {
              "x": 0,
              "y": 12,
              "colSpan": 7,
              "rowSpan": 5
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Users Account Management over time\nSecurityEvent\n| where EventID in (4720, 4722, 4725, 4726, 4240, 4767)\n| extend Operation = case(                         EventID == 4720, 'User Created',                         EventID == 4722, 'User Enabled',                         EventID == 4725, 'User Disabled',                         EventID == 4726, 'User Deleted',                         EventID == 4740, 'User Locked Out',                         EventID == 4767, 'User Unlocked',                         'Unknown')\n| summarize Amount = count() by Operation\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Operation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "Amount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/IdentityAndAccessDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "54361477-319b-4418-987c-f183d70405f3"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"

                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Users account operations activity",
                  "PartSubTitle": "By type"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "11": {
            "position": {
              "x": 7,
              "y": 12,
              "colSpan": 7,
              "rowSpan": 5
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where EventID in (4720, 4722, 4725, 4726, 4240, 4767)\n| order by TimeGenerated\n| extend EventType = case(\n                        EventID == 4720, 'User account created',\n                        EventID == 4722, 'User account enabled',\n                        EventID == 4725, 'User account disabled',\n                        EventID == 4726, 'User account deleted',\n                        EventID == 4767, 'User account unlocked',\n                        EventID == 4740, 'User account locked out',\n                        strcat('Unkown Event ID', EventID))\n| project Time_Generated = TimeGenerated, Event_Type = EventType, Computer, Account\n| limit 10\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/IdentityAndAccessDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "18102f77-c55f-47eb-8ea2-b50a61bfdd18"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"

                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "User operation events",
                  "PartSubTitle": "Last 10 - Created, Enabled, Disabled, Deleted, Locked Out, Unlocked"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "12": {
            "position": {
              "x": 14,
              "y": 12,
              "colSpan": 13,
              "rowSpan": 5
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where EventID in (4720, 4722, 4725, 4726, 4240, 4767)\n| extend EventType = case(\n                        EventID == 4720, 'User account created',\n                        EventID == 4722, 'User account enabled',\n                        EventID == 4725, 'User account disabled',\n                        EventID == 4726, 'User account deleted',\n                        EventID == 4767, 'User account unlocked',\n                        EventID == 4740, 'User account locked out',\n                        strcat('Unkown Event ID', EventID))\n| project EventType, Computer\n| evaluate pivot(EventType, count(EventType))"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/IdentityAndAccessDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "3f1abe3a-a345-407f-9d05-d7addcfc5e4b"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"

                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "User operations per machine",
                  "PartSubTitle": "Following events : Created, Enabled, Disabled, Deleted, Locked Out, Unlocked"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "13": {
            "position": {
              "x": 0,
              "y": 17,
              "colSpan": 25,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Machine Logons</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "14": {
            "position": {
              "x": 0,
              "y": 18,
              "colSpan": 7,
              "rowSpan": 5
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where EventID == 4624\n| where TimeGenerated >= ago(14d)\n| summarize Current_Week = countif(TimeGenerated >= ago(7d)), Previous_Week = countif(TimeGenerated < ago(7d)) by Computer\n| extend Per = iff(Current_Week > Previous_Week, toreal(Current_Week) / Previous_Week, toreal(Previous_Week) / Current_Week)\n| extend sign = iff(Current_Week > Previous_Week, \"+\", \"-\")\n| extend Percentage = iff(Current_Week != 0 and Previous_Week != 0 and Previous_Week != Current_Week, strcat(sign, extract(@\"(\\d*(\\.\\d{1,2}|$))\", 1, tostring((Per -1 )*100)), \"%\"), \"No Percentage - 0\")\n| project Computer, Previous_Week, Current_Week, Percentage"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/IdentityAndAccessDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "8198fe90-01bf-4f70-b183-28e24ce3a255"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"

                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Number of successful logons per machine",
                  "PartSubTitle": "Week Over Week"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              },
              "filters": {
                "MsPortalFx_TimeRange": {
                  "model": {
                    "format": "local",
                    "granularity": "auto",
                    "relative": "1d"
                  }
                }
              }
            }
          },
          "15": {
            "position": {
              "x": 7,
              "y": 18,
              "colSpan": 4,
              "rowSpan": 5
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where AccountType == \"Machine\" and EventID == 4624\n| summarize AccountsNum = dcount(Account) by Computer\n| sort by AccountsNum \n| take 50\n| project Computer, Accounts = AccountsNum \n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/IdentityAndAccessDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "875239c9-e943-4734-857a-cbb3fea8079d"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Number of accounts successfully logged on",
                  "PartSubTitle": "Per machine"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "16": {
            "position": {
              "x": 11,
              "y": 18,
              "colSpan": 3,
              "rowSpan": 5
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where EventID in (4624, 4625)\n| where AccountType == \"Machine\"\n| summarize Amount = count() by  LogonTypeName\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/IdentityAndAccessDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "e409bb01-5776-4be7-ae39-d6acc04d7b3d"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"

                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Machine logons by type",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "17": {
            "position": {
              "x": 14,
              "y": 18,
              "colSpan": 13,
              "rowSpan": 5
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where EventID == 4625\n| extend Reason = case(                         SubStatus == '0xc0000064', 'User name does not exist',                         SubStatus == '0xc000005e', 'No logon servers available to service the logon request',                         SubStatus == '0xc0000062', 'Account name is not properly formatted',                         SubStatus == '0xc0000064', 'Account name does not exist',                         SubStatus == '0xc000006a', 'Incorrect password',                         SubStatus == '0xc000006d', 'Bad user name or password',                         SubStatus == '0xc000006f', 'User logon blocked by account restriction',                         SubStatus == '0xc000006f', 'User logon outside of restricted logon hours',                         SubStatus == '0xc0000070', 'User logon blocked by workstation restriction',                         SubStatus == '0xc0000071', 'Password has expired',                         SubStatus == '0xc0000072', 'Account is disabled',                         SubStatus == '0xc0000133', 'Clocks between DC and other computer too far out of sync',                         SubStatus == '0xc000015b', 'The user has not been granted the requested logon right at this machine',                         SubStatus == '0xc0000193', 'Account has expirated',                         SubStatus == '0xc0000224', 'User is required to change password at next logon',                         SubStatus == '0xc0000234', 'Account is currently locked out',                         strcat('Unknown reason substatus: ', SubStatus))\n| summarize count() by Reason, Computer\n| evaluate pivot(Reason, sum(count_))"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/IdentityAndAccessDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "e4278d18-baec-4322-965b-d1b441400011"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"

                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Failed reasons per machine",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "18": {
            "position": {
              "x": 0,
              "y": 0,
              "colSpan": 1,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [
                {
                  "name": "subscriptionId",
                  "value": "{Subscription_Id}"
                },
                {
                  "name": "resourceGroup",
                  "value": "{Resource_Group}"
                },
                {
                  "name": "workspaceName",
                  "value": "{Workspace_Name}"
                }
              ],
              "type": "Extension/Microsoft_Azure_Security_Insights/PartType/AsiOverviewPart",
              "defaultMenuItemId": "0"
            }
          }
        }
      }
    }
  }
},{
  "name": "InsecureProtocolsDashboard_{Workspace_Name}",
  "type": "Microsoft.Portal/dashboards",
  "location": "{Dashboard_Location}",
  "tags": {
    "addonKey": "InsecureProtocolsDashboard",
    "hidden-title": "Insecure Protocols - {Workspace_Name}",
    "version": "1.0",
    "workspaceName": "{Workspace_Name}"
  },
  "properties": {
    "lenses": {
      "0": {
        "order": 0,
        "parts": {
          "0": {
            "position": {
              "x": 1,
              "y": 0,
              "colSpan": 16,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "",
                    "title": "Insecure Protocols Overview",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "1": {
            "position": {
              "x": 0,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| union Event\n| where (EventID == 2889) or (EventID == 3000 and EventLog == \"Microsoft-Windows-SMBServer/Audit\") or (EventID == 4624 and AuthenticationPackageName == \"NTLM\" and LmPackageName == \"NTLM V1\" and Account !contains \"ANONYMOUS LOGON\") or ((EventID == 4624 or EventID == 4776) and Level == 8 and PackageName contains \"WDigest\")\n| summarize Count=count() by tostring(EventID)\n| extend Protocol=replace(tostring(4776), 'wDigest', replace(tostring(2889), 'Insecure LDAP', replace(tostring(4624), 'NTLM v1', replace(tostring(3000), 'SMB v1', tostring(EventID)))))\n| project Protocol, Count\n| sort by Count desc"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Protocol",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "Count",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "ebb45159-813b-4474-9317-b4b092adbe9f"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Insecure Protocols",
                  "PartSubTitle": "Summary"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "2": {
            "position": {
              "x": 6,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| union Event\n| where (EventID == 2889) or (EventID == 3000 and EventLog == \"Microsoft-Windows-SMBServer/Audit\") or (EventID == 4624 and AuthenticationPackageName == \"NTLM\" and LmPackageName == \"NTLM V1\" and Account !contains \"ANONYMOUS LOGON\") or ((EventID == 4624 or EventID == 4776) and Level == 8 and PackageName contains \"WDigest\")\n| summarize Count=count() by bin(TimeGenerated, 1h), tostring(EventID)\n| extend Protocol=replace(tostring(4776), 'wDigest', replace(tostring(2889), 'Insecure LDAP', replace(tostring(4624), 'NTLM v1', replace(tostring(3000), 'SMB v1', tostring(EventID)))))\n| project Protocol, Count, TimeGenerated \n| sort by Count desc"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Count",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Protocol",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "0b7eee52-acc4-4c65-be21-18240391bffd"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Area"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Insecure Protocols",
                  "PartSubTitle": "by Time"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "3": {
            "position": {
              "x": 0,
              "y": 5,
              "colSpan": 17,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "",
                    "title": "Insecure LDAP",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "4": {
            "position": {
              "x": 0,
              "y": 6,
              "colSpan": 5,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "Event\r\n | where EventID == 2889\r\n | project ParameterXml, DomainController=Computer , TimeGenerated, EventID \r\n | parse ParameterXml with * \"<Param>\" IPAddress \":\" *\r\n | parse ParameterXml with * \"><Param>\" Account \"</\" *\r\n | parse kind = regex ParameterXml with * \"</Param><Param>\" * \"</Param><Param>\" BindingType \"</Param>\"\r\n | summarize QueryCount = count(EventID) by LDAPClient=IPAddress\r\n | top 10 by QueryCount \n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "LDAPClient",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "QueryCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "25e0aa7a-4784-4893-a6ac-c1c2e18839a2"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Insecure LDAP",
                  "PartSubTitle": "by Client"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "5": {
            "position": {
              "x": 5,
              "y": 6,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "Event\r\n | where EventID == 2889 \r\n | project ParameterXml, DomainController=Computer , TimeGenerated, EventID \r\n | parse ParameterXml with * \"<Param>\" IPAddress \":\" *\r\n | parse ParameterXml with * \"><Param>\" Account \"</\" *\r\n | parse kind = regex ParameterXml with * \"</Param><Param>\" * \"</Param><Param>\" BindingType \"</Param>\"\r\n | summarize QueryCount = count(EventID) by HourGenerated=bin(TimeGenerated, 1h)\r\n | render timechart  \r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "HourGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "QueryCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "0adc552d-b2e8-4d63-b737-b603fd106db1"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Area"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Insecure LDAP",
                  "PartSubTitle": "by Time"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "6": {
            "position": {
              "x": 11,
              "y": 6,
              "colSpan": 7,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "Event\r\n | where EventID == 2889 \r\n | project ParameterXml, DomainController=Computer , TimeGenerated, EventID \r\n | parse ParameterXml with * \"<Param>\" IPAddress \":\" *\r\n | parse ParameterXml with * \"><Param>\" Account \"</\" *\r\n | parse kind = regex ParameterXml with * \"</Param><Param>\" * \"</Param><Param>\" BindingType \"</Param>\"\r\n | summarize QueryCount = count(EventID) by Account, IPAddress\r\n | sort by QueryCount desc nulls last  \r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "c610b568-f3dd-43cd-875b-37be59cba1fb"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Insecure LDAP",
                  "PartSubTitle": "Details"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "7": {
            "position": {
              "x": 0,
              "y": 10,
              "colSpan": 17,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "",
                    "title": "NTLM v1",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "8": {
            "position": {
              "x": 0,
              "y": 11,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\r\n| where EventID == 4624\r\n| where AuthenticationPackageName == \"NTLM\"\r\n| where LmPackageName == \"NTLM V1\" \r\n| where Account !contains \"ANONYMOUS LOGON\"\r\n| summarize Count = count() by WorkstationName, Computer\r\n| top 5 by Count desc\r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "WorkstationName",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "Count",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Computer",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "b9ee7aa7-5f15-45d5-9639-03629fd5ef5e"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "NTLM v1",
                  "PartSubTitle": "by Source and Server"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "9": {
            "position": {
              "x": 6,
              "y": 11,
              "colSpan": 5,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\r\n| where EventID == 4624\r\n| where AuthenticationPackageName == \"NTLM\"\r\n| where LmPackageName == \"NTLM V1\" \r\n| where Account !contains \"ANONYMOUS LOGON\"\r\n| summarize Count=count() by Day=bin(TimeGenerated, 1h)\r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Day",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Count",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "acc6ded7-f670-4198-b62c-b76bafb68b4e"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Area"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "NTLM v1",
                  "PartSubTitle": "by Time"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "10": {
            "position": {
              "x": 11,
              "y": 11,
              "colSpan": 7,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\r\n| where EventID == 4624\r\n| where AuthenticationPackageName == \"NTLM\"\r\n| where LmPackageName == \"NTLM V1\" \r\n| where Account !contains \"ANONYMOUS LOGON\"\r\n| summarize Count = count() by Account, WorkstationName, DC=Computer\r\n| sort by Count desc \r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "9f987061-5241-42e6-9cd0-5a00428d7d22"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "NTLM v1",
                  "PartSubTitle": "Details"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "11": {
            "position": {
              "x": 0,
              "y": 15,
              "colSpan": 17,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "",
                    "title": "SMB v1",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "12": {
            "position": {
              "x": 0,
              "y": 16,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "Event\r\n| where EventID == 3000 and EventLog == \"Microsoft-Windows-SMBServer/Audit\"\r\n| parse ParameterXml with * \"<Param>\" ClientAddress \"</\" *\r\n| extend Client = replace(@\">\", @\"\", replace(@\"\\]\", @\"\", replace(@\"\\[\", @\"\", replace(@\"<!\\[CDATA\", @\"\", ClientAddress))))\r\n| summarize Count=count() by Client, SMBServer=Computer\r\n| top 5 by Count desc nulls last\r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Client",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "Count",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "SMBServer",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "8ce8d889-1a10-487e-a5b2-de28f20016f0"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "SMB v1",
                  "PartSubTitle": "by Client and SMB Server"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "13": {
            "position": {
              "x": 6,
              "y": 16,
              "colSpan": 5,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "Event\r\n| where EventID == 3000 and EventLog == \"Microsoft-Windows-SMBServer/Audit\"\r\n| parse ParameterXml with * \"<Param>\" ClientAddress \"</\" *\r\n| summarize Count=count() by bin(TimeGenerated, 1h) \n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Count",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "909a8543-d3b9-481e-94ef-058920acce9a"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Area"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "SMB v1",
                  "PartSubTitle": "by Time"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "14": {
            "position": {
              "x": 11,
              "y": 16,
              "colSpan": 7,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "Event\n| where EventID == 3000 and EventLog == \"Microsoft-Windows-SMBServer/Audit\"\n| parse ParameterXml with * \"<Param>\" ClientAddress \"</\" *\n| extend Client = replace(@\">\", @\"\", replace(@\"\\]\", @\"\", replace(@\"\\[\", @\"\", replace(@\"<!\\[CDATA\", @\"\", ClientAddress))))\n| summarize Count=count() by Client, SMBServer=Computer\n| sort by Count desc\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "f2f1e9a2-a186-4904-bccc-0ef089eef067"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "SMB v1",
                  "PartSubTitle": "Details"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "15": {
            "position": {
              "x": 0,
              "y": 20,
              "colSpan": 17,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "",
                    "title": "Kerberos Weak Ciphers",
                    "subtitle": "AES will be filtered out, however lab currently only has AES encryption"
                  }
                }
              }
            }
          },
          "16": {
            "position": {
              "x": 0,
              "y": 21,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where EventID == 4768 or EventID == 4769\n| where Level == 8\n| parse EventData with * '\"TicketEncryptionType\">' TicketEncryptionType '<' *\n| where TicketEncryptionType != \"0x12\" and TicketEncryptionType != \"0x11\" //Filter out AES\n//| where TicketEncryptionType != \"0x17\" //RC4\n| parse EventData with * '\"IpAddress\">' IpAddress '<' *\n| parse EventData with * '\"TargetUserName\">' TargetUserName '<' *\n| parse EventData with * '\"ServiceName\">' ServiceName '<' *\n| extend Cipher=replace('0x18$', 'RC4-HMAC-EXP', replace('0x12$', 'AES256-CTS-HMAC-SHA1', replace('0x11$', 'AES128-CTS-HMAC-SHA1', replace('0x1$', 'DES_CBC_CRC', replace('0x2$', 'DES_CBC_MD4', replace('0x7$', 'DES3_CBC_SHA1', replace('0x5$', 'DES3_CBC_MD5', replace('0x3$', 'DES_CBC_MD5', replace('0x17$', 'RC4_HMAC', TicketEncryptionType)))))))))\n| summarize Count=count() by Cipher, bin(TimeGenerated, 1h)\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Count",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Cipher",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "c0d62167-5b61-4df1-8d55-10112f7cde71"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Area"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Kerberos Weak Ciphers",
                  "PartSubTitle": "by Time and Cipher"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "17": {
            "position": {
              "x": 6,
              "y": 21,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where EventID == 4768 or EventID == 4769\n| where Level == 8\n| parse EventData with * '\"TicketEncryptionType\">' TicketEncryptionType '<' *\n| where TicketEncryptionType != \"0x12\" and TicketEncryptionType != \"0x11\" //Filter out AES\n//| where TicketEncryptionType != \"0x17\" //RC4\n| parse EventData with * '\"IpAddress\">' IpAddress '<' *\n| parse EventData with * '\"TargetUserName\">' TargetUserName '<' *\n| parse EventData with * '\"ServiceName\">' ServiceName '<' *\n| extend Cipher=replace('0x18$', 'RC4-HMAC-EXP', replace('0x12$', 'AES256-CTS-HMAC-SHA1', replace('0x11$', 'AES128-CTS-HMAC-SHA1', replace('0x1$', 'DES_CBC_CRC', replace('0x2$', 'DES_CBC_MD4', replace('0x7$', 'DES3_CBC_SHA1', replace('0x5$', 'DES3_CBC_MD5', replace('0x3$', 'DES_CBC_MD5', replace('0x17$', 'RC4_HMAC', TicketEncryptionType)))))))))\n| summarize Count=count() by Cipher, IpAddress, TargetUserName , ServiceName, Computer\n| sort by Count desc"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "1625086b-bdb4-4b52-a062-68712b6a2e06"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Kerberos Weak Ciphers",
                  "PartSubTitle": "Details"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "18": {
            "position": {
              "x": 0,
              "y": 25,
              "colSpan": 17,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "",
                    "title": "wDigest",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "19": {
            "position": {
              "x": 0,
              "y": 26,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\r\n| where EventID == 4624 or EventID == 4776\r\n| where Level == 8\r\n| where PackageName contains \"WDigest\"\r\n| summarize Count=count() by Workstation, TargetAccount\r\n| sort by Count desc \r\n| top 5 by Count\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Workstation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "Count",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "TargetAccount",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "08013eb2-b7e9-4f53-bd35-381c417193bc"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "wDigest",
                  "PartSubTitle": "by Workstation and Account"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "20": {
            "position": {
              "x": 6,
              "y": 26,
              "colSpan": 5,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\r\n| where EventID == 4624 or EventID == 4776\r\n| where Level == 8\r\n| where PackageName contains \"WDigest\"\r\n| summarize Count=count() by bin(TimeGenerated, 1h), Workstation\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Count",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Workstation",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "0106ca3e-973c-4838-b828-e609a9281464"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Area"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "wDigest",
                  "PartSubTitle": "by Time and Workstation"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "21": {
            "position": {
              "x": 11,
              "y": 26,
              "colSpan": 7,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "SecurityEvent\n| where EventID == 4624 or EventID == 4776\n| where Level == 8\n| where PackageName contains \"WDigest\"\n| summarize Count=count() by TargetAccount, Workstation, wDigestServer=Computer \n| sort by Count desc"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/InsecureProtocolsDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "8c0206a5-c57f-4dd6-8b48-47527cb850aa"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "wDigest",
                  "PartSubTitle": "Details"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "22": {
            "position": {
              "x": 0,
              "y": 0,
              "colSpan": 1,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [
                {
                  "name": "subscriptionId",
                  "value": "{Subscription_Id}"
                },
                {
                  "name": "resourceGroup",
                  "value": "{Resource_Group}"
                },
                {
                  "name": "workspaceName",
                  "value": "{Workspace_Name}"
                }
              ],
              "type": "Extension/Microsoft_Azure_Security_Insights/PartType/AsiOverviewPart",
              "defaultMenuItemId": "0"
            }
          }
        }
      }
    }
  }
},{
  "name": "JuniperDashboard_{Workspace_Name}",
  "type": "Microsoft.Portal/dashboards",
  "location": "{Dashboard_Location}",
  "tags": {
    "addonKey": "JuniperDashboard",
    "hidden-title": "Juniper - {Workspace_Name}",
    "version": "1.0",
    "workspaceName": "{Workspace_Name}"
  },
  "properties": {
    "lenses": {
      "0": {
        "order": 0,
        "parts": {
          "0": {
            "position": {
              "x": 1,
              "y": 0,
              "colSpan": 15,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Juniper Overview</div> ",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "1": {
            "position": {
              "x": 16,
              "y": 0,
              "colSpan": 8,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<img width='350' height='50' src='https://img1-327a.kxcdn.com/DataImage.ashx/8015773'/>\n\n",
                    "title": "",
                    "subtitle": "My subtitle"
                  }
                }
              }
            }
          },
          "2": {
            "position": {
              "x": 0,
              "y": 1,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//total volume\nSyslog\n| where HostName contains \"juniper\"\n| summarize LogVolume=count() by TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "LogVolume",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "dceac968-24a9-4510-947d-09d8bb14db97"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Event Count Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "3": {
            "position": {
              "x": 12,
              "y": 1,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//process trend\nSyslog\n| where HostName contains \"juniper\" \n| summarize ProcessCount=count() by ProcessName, TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "ProcessCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "ProcessName",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "d8932f94-809b-470c-99ce-cb7c15d8f326"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Process Count Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "4": {
            "position": {
              "x": 0,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//type trend over all\nSyslog\n| where HostName contains \"juniper\"\n| extend SessionType= extract(\"^(.*?):\",1,SyslogMessage)\n| where SessionType  !=\"\"\n| summarize SessionTypeCount=count() by SessionType, TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "SessionTypeCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "SessionType",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "b55a4e4b-c4ab-4185-b530-0eeab34d0a80"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Session Type Count Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "5": {
            "position": {
              "x": 6,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "Syslog\n| where HostName contains \"juniper\"\n| where ProcessName == \"RT_FLOW\"\n| extend SessionType= extract(\"^(.*?):\",1,SyslogMessage)\n| where SessionType  !=\"\"\n| summarize SessionTypeCount=count() by SessionType\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "SessionType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "SessionTypeCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "b5292d65-2de8-4e6d-806f-5adbe66ab675"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "RT Flow Session Type Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "6": {
            "position": {
              "x": 12,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Session Close Reason Summary\nSyslog\n| where HostName contains \"juniper\"\n| extend Reason= extract(\".*?: session closed (.*?):\",1,SyslogMessage)\n| where Reason  !=\"\"\n| summarize ReasonCount= count() by Reason\n| top 5 by ReasonCount desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "c950c54a-45eb-4325-aefd-1996a8878f7f"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Session Close Reason Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "7": {
            "position": {
              "x": 18,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//process count\nSyslog\n| where HostName contains \"juniper\"\n| summarize ProcessCount=count() by ProcessName\n| sort by ProcessCount desc nulls last\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "ProcessName",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "ProcessCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "bbe48eb0-62c6-4f85-a82f-c69cb27da6fe"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Process Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "8": {
            "position": {
              "x": 0,
              "y": 9,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Top 5 IP Adresses Inbound And Outbound</div> ",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "9": {
            "position": {
              "x": 0,
              "y": 10,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Outbound Source IP Addresses\nSyslog\n| where HostName contains \"juniper\"\n| where SyslogMessage contains \"default-permit trust untrust\"\n| extend SourceIP=extract(\"([0-9.].*?)/[0-9].*?->\",1,SyslogMessage)\n| summarize SourceIPCount=count() by SourceIP\n| top 5 by SourceIPCount desc nulls last\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "4aba904b-9824-43d5-93a9-b3a29671086d"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Source IP Addresses",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "10": {
            "position": {
              "x": 6,
              "y": 10,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Outbound Destination IP Addresses\nSyslog\n| where HostName contains \"juniper\"\n| where SyslogMessage contains \"default-permit trust untrust\"\n| extend DestinationIP=extract(\"->([0-9.].*?)/[0-9].*?\",1,SyslogMessage)\n| summarize DestinationIPCount=count() by DestinationIP\n| top 5 by DestinationIPCount desc nulls last\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "c053c125-0083-4ec9-b9ab-da234b663ec1"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Destination IP Addresses",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "11": {
            "position": {
              "x": 12,
              "y": 10,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Inbound Source IP Addresses\nSyslog\n| where HostName contains \"juniper\"\n| where SyslogMessage contains \"server-access untrust trust\"\n| extend SourceIP=extract(\"([0-9.].*?)/[0-9].*?->\",1,SyslogMessage)\n| summarize SourceIPCount=count() by SourceIP\n| top 5 by SourceIPCount desc nulls last\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "ef0bec93-5b9a-41fb-9fdb-e2f01ba3ba77"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Inbound Source IP Addresses",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "12": {
            "position": {
              "x": 18,
              "y": 10,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Inbound Destination IP Addresses\nSyslog\n| where HostName contains \"juniper\"\n| where SyslogMessage contains \"server-access untrust trust\"\n| extend DestinationIP=extract(\"->([0-9.].*?)/[0-9].*?\",1,SyslogMessage)\n| summarize DestinationIPCount=count() by DestinationIP\n| top 5 by DestinationIPCount desc nulls last\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "489faf13-e6fe-4a98-bfea-22ad09d393c6"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Inbound Destination IP Addresses",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "13": {
            "position": {
              "x": 0,
              "y": 14,
              "colSpan": 12,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Top 5 Ports</div> \n",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "14": {
            "position": {
              "x": 0,
              "y": 15,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "// top source port\nSyslog\n| where HostName contains \"juniper\"\n| extend DestinationPort=extract(\"[0-9.].*?/([0-9].*?)->\",1,SyslogMessage)\n| summarize DestinationPortCount=count() by DestinationPort\n| top 5 by DestinationPortCount desc nulls last\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "DestinationPort",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "DestinationPortCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "f43f11ce-45ec-4e31-9287-1bbc62323ccf"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Source Ports",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "15": {
            "position": {
              "x": 6,
              "y": 15,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//top destination port\nSyslog\n| where HostName contains \"juniper\"\n| extend DestinationPort=extract(\"->[0-9.].*?/([0-9].*?) \",1,SyslogMessage)\n| summarize DestinationPortCount=count() by DestinationPort\n| top 5 by DestinationPortCount desc nulls last\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "DestinationPort",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "DestinationPortCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "e4156e69-2680-442e-a481-ebe8c44acf09"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Destination Ports",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "16": {
            "position": {
              "x": 0,
              "y": 19,
              "colSpan": 18,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Firewall Management</div> ",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "17": {
            "position": {
              "x": 0,
              "y": 20,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Type count trend mgd\nSyslog\n| where HostName contains \"juniper\"\n| where ProcessName == \"mgd\"\n| extend SessionType= extract(\"^(.*?):\",1,SyslogMessage)\n| where SessionType  !=\"\"\n| summarize SessionTypeCount=count() by SessionType, TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "SessionTypeCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "SessionType",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "25bbcdf7-b1ce-48ac-864c-682f6604659d"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Device Config Change Count Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "18": {
            "position": {
              "x": 6,
              "y": 20,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "Syslog\n| where HostName contains \"juniper\" \n| extend SessionType= extract(\"^(.*?):\",1,SyslogMessage) \n| where SessionType  !contains \"RT_FLOW\"\n| where SessionType !=\"\"\n| summarize SessionTypeCount=count() by SessionType \n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "5b30ee47-7f5e-40b0-be6b-0e21ea355b35"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Non Flow Session Summary  By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "19": {
            "position": {
              "x": 12,
              "y": 20,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "// user access for management\nSyslog\n| where HostName contains \"juniper\"\n| where ProcessName == \"mgd\"\n| extend UserName=extract(\"User '(.*?)'\",1,SyslogMessage)\n| summarize UserCount=count() by UserName\n| top 5 by UserCount desc nulls last\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "UserName",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "UserCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/JuniperDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "62c2bafb-ee6e-4a4b-a57c-f50d2e8724d2"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Firewall Login By Attempts",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "20": {
            "position": {
              "x": 0,
              "y": 0,
              "colSpan": 1,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [
                {
                  "name": "subscriptionId",
                  "value": "{Subscription_Id}"
                },
                {
                  "name": "resourceGroup",
                  "value": "{Resource_Group}"
                },
                {
                  "name": "workspaceName",
                  "value": "{Workspace_Name}"
                }
              ],
              "type": "Extension/Microsoft_Azure_Security_Insights/PartType/AsiOverviewPart",
              "defaultMenuItemId": "0"
            }
          }
        }
      }
    }
  }
},{ 
  "name": "Office365Dashboard_{Workspace_Name}",
  "type": "Microsoft.Portal/dashboards",
  "location": "{Dashboard_Location}",
  "tags": {
    "addonKey": "Office365Dashboard",
    "hidden-title": "Office 365 - {Workspace_Name}",
    "version": "1.0",
    "workspaceName": "{Workspace_Name}"
  },
  "properties": {
    "lenses": {
      "0": {
        "order": 0,
        "parts": {
          "0": {
            "position": {
              "x": 1,
              "y": 0,
              "colSpan": 23,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">General Overview</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "1": {
            "position": {
              "x": 0,
              "y": 1,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\n| summarize count() by OfficeWorkload, bin_at(TimeGenerated, 1h, now())"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "OfficeWorkload",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "6e328156-5f22-4e7e-ab06-67f382df5883"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Area"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Office activity by workload",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "2": {
            "position": {
              "x": 12,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\r\n| summarize count() by OfficeWorkload\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "OfficeWorkload",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "7391e81f-0aec-4eb5-8234-a9a52e56fb9e"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Activity by workload",
                  "PartSubTitle": "- "
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "3": {
            "position": {
              "x": 18,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\r\n| where ItemType != \"\"\r\n| summarize count() by ItemType\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "ItemType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "950d0e7b-c84b-4b6a-ae41-bb5ffc3bd1bd"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Activity by type",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "4": {
            "position": {
              "x": 0,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\r\n| summarize count() by UserType\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "UserType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "73a9103c-ed9b-4d0a-8f7f-d86d145bea80"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Activity by user type",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "5": {
            "position": {
              "x": 6,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Admin operations ordered by amount\r\nOfficeActivity\r\n| where UserType == \"Admin\"\r\n| summarize count() by Operation\r\n| order by count_ \r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Operation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "b63340f2-53e1-46f9-8aa2-d9fa96ac31bf"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Admin operations by type",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "6": {
            "position": {
              "x": 12,
              "y": 5,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\n| summarize Update = countif(Operation contains \"update\"), Create = countif(Operation contains \"create\"), Delete = countif(Operation contains \"delete\"), Add = countif(Operation contains \"add\") by bin_at(TimeGenerated, 1d, now())"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Update",
                        "type": "Int64"
                      },
                      {
                        "name": "Create",
                        "type": "Int64"
                      },
                      {
                        "name": "Delete",
                        "type": "Int64"
                      },
                      {
                        "name": "Add",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "2bc078e1-3fe8-489c-b807-b5562a7a84e3"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Update VS Create VS Add VS Delete",
                  "PartSubTitle": "Over the last week"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              },
              "filters": {
                "MsPortalFx_TimeRange": {
                  "model": {
                    "format": "utc",
                    "granularity": "auto",
                    "relative": "7d"
                  }
                }
              }
            }
          },
          "7": {
            "position": {
              "x": 0,
              "y": 9,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\r\n| where TimeGenerated >= ago(14d)\r\n| where Operation contains \"group\"\r\n| summarize count() by bin(TimeGenerated, 1d)\r\n| extend Week = iff(TimeGenerated>ago(7d), \"This Week\", \"Last Week\"), TimeGenerated = iff(TimeGenerated>ago(7d), TimeGenerated, TimeGenerated + 7d)\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Week",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "e5966484-1d9f-459d-9791-6584a0bf8266"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Group operations",
                  "PartSubTitle": "Week Over Week"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              },
              "filters": {
                "MsPortalFx_TimeRange": {
                  "model": {
                    "format": "utc",
                    "granularity": "auto",
                    "relative": "1d"
                  }
                }
              }
            }
          },
          "8": {
            "position": {
              "x": 6,
              "y": 9,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\r\n| where TimeGenerated >= ago(14d)\r\n| where Operation contains \"user\"\r\n| summarize count() by bin(TimeGenerated, 1d)\r\n| extend Week = iff(TimeGenerated>ago(7d), \"This Week\", \"Last Week\"), TimeGenerated = iff(TimeGenerated>ago(7d), TimeGenerated, TimeGenerated + 7d)\r\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Week",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "521a979d-0657-4bf0-96d9-7bea98ba9355"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "User operations",
                  "PartSubTitle": "Week Over Week"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              },
              "filters": {
                "MsPortalFx_TimeRange": {
                  "model": {
                    "format": "utc",
                    "granularity": "auto",
                    "relative": "1d"
                  }
                }
              }
            }
          },
          "9": {
            "position": {
              "x": 12,
              "y": 9,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\r\n| where Operation contains \"Folder\"\r\n| summarize count() by Operation\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Operation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "e0a5001c-2a6a-40ce-a3f9-364e5aa58911"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Folder changes ",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "10": {
            "position": {
              "x": 18,
              "y": 9,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\r\n| where Operation contains \"File\"\r\n| summarize count() by Operation\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Operation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "de0d201a-b466-4657-922d-c5436372eae8"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "File changes",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "11": {
            "position": {
              "x": 0,
              "y": 13,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">SharePoint & OneDrive</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "12": {
            "position": {
              "x": 0,
              "y": 14,
              "colSpan": 6,
              "rowSpan": 6
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top sharepoint client IPS\nOfficeActivity\n| where OfficeWorkload in ('OneDrive', 'SharePoint')\n| summarize Amount = count() by Operation\n| top 10 by Amount\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "0ffd9092-1c3a-4593-b91d-565a7f6eb3c6"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 10 operations",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "13": {
            "position": {
              "x": 6,
              "y": 14,
              "colSpan": 6,
              "rowSpan": 6
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Files Downloaded by type\nOfficeActivity\n| where OfficeWorkload in ('OneDrive', 'SharePoint')\n| where Operation == \"FileDownloaded\"\n| summarize count() by SourceFileExtension\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "SourceFileExtension",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "0390c5a7-2edb-4c69-803b-b983b931ebf9"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Files downloaded by extension",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "14": {
            "position": {
              "x": 12,
              "y": 14,
              "colSpan": 6,
              "rowSpan": 6
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Files Uploaded by type\r\nOfficeActivity\r\n| where OfficeWorkload in ('OneDrive', 'SharePoint')\r\n| where Operation == \"FileUploaded\"\r\n| summarize count() by SourceFileExtension\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "SourceFileExtension",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "db2abfb5-40a7-4cef-8e3c-e2e78bd768a3"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Files uploaded by extension",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "15": {
            "position": {
              "x": 18,
              "y": 14,
              "colSpan": 6,
              "rowSpan": 6
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top sharepoint sites\r\nOfficeActivity\r\n| where OfficeWorkload in ('OneDrive', 'SharePoint') and Site_Url != \"\"\r\n| summarize Amount = count() by Site_Url\r\n| top 10 by Amount \n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "7d976990-dd59-462b-a148-f32509965531"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 10 sites",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "16": {
            "position": {
              "x": 0,
              "y": 20,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Exchange</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "17": {
            "position": {
              "x": 0,
              "y": 21,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Mailbox Logins by hour\nOfficeActivity\n| where OfficeWorkload == \"Exchange\" and Operation == \"MailboxLogin\"\n| summarize Logins = count() by bin_at(TimeGenerated, 1h, now())\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Logins",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "826595b0-3c03-4415-ab47-5586fbbff615"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Mailbox logins by hour",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "18": {
            "position": {
              "x": 12,
              "y": 21,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Exchange operations that are performed by actors outside your organization - external\nOfficeActivity\n| where OfficeWorkload == \"Exchange\"\n| where ExternalAccess == \"True\" \n| summarize count() by Operation\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Operation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "c63f44f6-7ad4-4658-8fd7-9794264354cb"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "External access operations by operation",
                  "PartSubTitle": "(operations that are performed by actors outside your organization)"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "19": {
            "position": {
              "x": 18,
              "y": 21,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\r\n| where OfficeWorkload == \"Exchange\"\r\n| summarize count() by UserType\r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "UserType",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "91a69395-1fcb-46b9-a763-b5a4d563bbb9"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Operations by user type",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "20": {
            "position": {
              "x": 0,
              "y": 25,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Azure Active Directory</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "21": {
            "position": {
              "x": 0,
              "y": 26,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\n| where OfficeWorkload == \"AzureActiveDirectory\"\n| summarize additions = countif(Operation contains \"add\"), updates = countif(Operation contains \"Update\"), deletions = countif(Operation contains \"Delete\") by bin_at(TimeGenerated, 1h, now())\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "additions",
                        "type": "Int64"
                      },
                      {
                        "name": "updates",
                        "type": "Int64"
                      },
                      {
                        "name": "deletions",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "c831a635-cc00-4ea4-beec-96bd6940023d"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Additions VS Updates VS Deletions",
                  "PartSubTitle": "Over the past week"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              },
              "filters": {
                "MsPortalFx_TimeRange": {
                  "model": {
                    "format": "local",
                    "granularity": "auto",
                    "relative": "7h"
                  }
                }
              }
            }
          },
          "22": {
            "position": {
              "x": 12,
              "y": 26,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//AzureActiveDirectory operations over time\r\nOfficeActivity \r\n| where OfficeWorkload == \"AzureActiveDirectory\"\r\n| where Operation contains \"group\"\r\n| summarize count() by Operation\r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Operation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "6b7e4c9f-b9fc-4371-a713-eae3dc7c942b"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Group operations",
                  "PartSubTitle": "Be type"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "23": {
            "position": {
              "x": 18,
              "y": 26,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity \n| where OfficeWorkload == \"AzureActiveDirectory\"\n| where Operation contains \"user\" and Operation != \"UserLoggedIn\"\n| summarize count() by Operation\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "Operation",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/Office365Dashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "2ee03209-ce71-4500-8052-37244a3a6c06"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "User operations",
                  "PartSubTitle": "By type"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "24": {
            "position": {
              "x": 0,
              "y": 0,
              "colSpan": 1,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [
                {
                  "name": "subscriptionId",
                  "value": "{Subscription_Id}"
                },
                {
                  "name": "resourceGroup",
                  "value": "{Resource_Group}"
                },
                {
                  "name": "workspaceName",
                  "value": "{Workspace_Name}"
                }
              ],
              "type": "Extension/Microsoft_Azure_Security_Insights/PartType/AsiOverviewPart",
              "defaultMenuItemId": "0"
            }
          }
        }
      }
    }
  }
},{
  "name": "PaloAltoDashboard_{Workspace_Name}",
  "type": "Microsoft.Portal/dashboards",
  "location": "{Dashboard_Location}",
  "tags": {
    "addonKey": "PaloAltoDashboard",
    "hidden-title": "Palo Alto - {Workspace_Name}",
    "version": "1.0",
    "workspaceName": "{Workspace_Name}"
  },
  "properties": {
    "lenses": {
      "0": {
        "order": 0,
        "parts": {
          "0": {
            "position": {
              "x": 1,
              "y": 0,
              "colSpan": 17,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">PaloAlto Overview</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "1": {
            "position": {
              "x": 18,
              "y": 0,
              "colSpan": 6,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": " \n<img width='350' height='50' src='https://d7umqicpi7263.cloudfront.net/img/product/6f2a9521-7dc3-46cc-8891-8c4d02d29666/b6b18c38-3509-4fdc-b72a-551a6f17eb6e.png'/> \n \n",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "2": {
            "position": {
              "x": 0,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| summarize LogVolume=count() by TimeGenerated"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "LogVolume",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "764ed73b-3584-463c-8f9f-fb824837fb74"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Event Count Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "3": {
            "position": {
              "x": 6,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| summarize ThreatVolume=count() by DeviceEventClassID, TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "ThreatVolume",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "DeviceEventClassID",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "4274f595-7d59-45e2-ad36-58d37300e9cf"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Event Class Count Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "4": {
            "position": {
              "x": 12,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"TRAFFIC\"\n| summarize EventCount= count() by DeviceEventClassID, TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "EventCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "DeviceEventClassID",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "5bc2a287-4ea5-462b-8fa5-6d2220a24daf"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Traffic Class ID Count Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "5": {
            "position": {
              "x": 18,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//trend by sevearity\nCommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| summarize SeverityCount = count() by LogSeverity , TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "SeverityCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "LogSeverity",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "2e6e9526-ec60-40b2-b410-7416dfb02b3d"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Event Severity Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "6": {
            "position": {
              "x": 0,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\" \n| where DeviceVendor == \"Palo Alto Networks\" \n| where Activity == \"TRAFFIC\" \n| where DeviceEventClassID == \"end\" \n| extend Reason= extract(\";reason=(.*?);\",1,AdditionalExtensions)\n| summarize ReasonCount= count() by  Reason, TimeGenerated  \n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "ReasonCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Reason",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "6e21db01-8c90-4f1e-b19e-ae370f3bba67"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Reasons For Session Ending Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "7": {
            "position": {
              "x": 6,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"TRAFFIC\"\n| summarize EventCount= count() by DeviceAction, TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "EventCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "DeviceAction",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "59252078-6c09-4c5b-9cfc-978dafe6aa1e"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Traffic Action Count By Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "8": {
            "position": {
              "x": 12,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| summarize ThreatVolume=count() by DeviceEventClassID\n| top 5 by ThreatVolume desc\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "DeviceEventClassID",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "ThreatVolume",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "716c395b-38b3-4dfe-bc66-f187678a62b2"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Threat Event Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "9": {
            "position": {
              "x": 18,
              "y": 5,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"TRAFFIC\"\n| summarize EventCount= count() by DeviceAction\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "e6d67a34-2f6d-436b-8d7e-ccdaa326ceef"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Traffic Action Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "10": {
            "position": {
              "x": 0,
              "y": 9,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"TRAFFIC\"\n| summarize EventCount= count() by DeviceEventClassID\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "DeviceEventClassID",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "EventCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "a41bd1d3-2036-4da3-bab2-2b66a81aaedf"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Traffic Event Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "11": {
            "position": {
              "x": 6,
              "y": 9,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "// Data sent outbound vs inbound\nCommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"TRAFFIC\"\n| extend Direction=iff(DeviceCustomString4==\"Trust\",\"Outbound\" ,\"Inbound\" )\n| summarize DataSentOutBoundMB=sumif(SentBytes, Direction==\"Outbound\")/1048576,   DataRecievedInboundMB=sumif(ReceivedBytes, Direction==\"Inbound\")/1048576 by TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "DataSentOutBoundMB",
                        "type": "Int64"
                      },
                      {
                        "name": "DataRecievedInboundMB",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "2ec1884e-290f-4779-ba71-c98562b799a2"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Sent And Received Data By Volume",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "12": {
            "position": {
              "x": 0,
              "y": 13,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Web Filter</div> \n",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "13": {
            "position": {
              "x": 0,
              "y": 14,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID  == \"url\"\n| where DeviceAction contains \"block\"\n| summarize ProtocolCount=count()  by ApplicationProtocol\n| top 5 by ProtocolCount desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "1bb289a4-1f77-45db-a9b9-8d7fc02c6016"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 URL Application Protocols Blocked",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "14": {
            "position": {
              "x": 6,
              "y": 14,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID  == \"url\"\n| where DeviceAction in (\"block-url\", \"block-continue\")\n| summarize CategoryCount=count() by DeviceCustomString2\n| project-rename CategoryName= DeviceCustomString2\n| top 5 by CategoryCount\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "08ecdff7-7b67-4799-90bd-12e143025adc"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 URL Category Blocked",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "15": {
            "position": {
              "x": 12,
              "y": 14,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID == \"url\"\n| where DeviceAction in (\"block-url\", \"block-continue\")\n| summarize URLCount=count() by RequestURL\n| top 5 by URLCount desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "2d8a6352-3eb3-4105-8f21-5f2cc740d2ac"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 URL Blocked",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "16": {
            "position": {
              "x": 18,
              "y": 14,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID  == \"url\"\n| summarize ProtocolCount=count() by ApplicationProtocol\n| top 5 by ProtocolCount desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "ee62df50-331a-41a9-bbe1-0472945e8225"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 URL Application Protocols",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "17": {
            "position": {
              "x": 0,
              "y": 18,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID == \"url\"\n| where DeviceAction in (\"alert\", \"continue\")\n| summarize URLCount=count() by RequestURL\n| top 5 by URLCount desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "db9a8cf9-17ea-4c2c-aafa-2f5aa7a4dae7"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 URL Allowed",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "18": {
            "position": {
              "x": 6,
              "y": 18,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID == \"url\"\n| summarize ActionCount=count() by DeviceAction\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "fd94c9fb-dd56-475c-8a53-3778d94cede5"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "URL Threat Action Summary  By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "19": {
            "position": {
              "x": 12,
              "y": 18,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID == \"url\"\n| where DeviceAction contains \"block\"\n| extend PAReferer= extract(\";PanOSReferer=(.*?);\",1,AdditionalExtensions)\n| where PAReferer !=\"\"\n| summarize RefererCount= count() by PAReferer\n| top 5 by RefererCount desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "b16d31da-170c-433e-b835-4f5fca094016"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Referrer For Blocked URL",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "20": {
            "position": {
              "x": 18,
              "y": 18,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID  == \"url\"\n| where DeviceAction in (\"alert\", \"continue\")\n| summarize CategoryCount=count() by DeviceCustomString2\n| project-rename CategoryName= DeviceCustomString2\n| top 5 by CategoryCount desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "ffc9dac9-2e99-4a7b-a797-e472ec6959c8"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 URL Category Allowed",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "21": {
            "position": {
              "x": 0,
              "y": 22,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID  == \"url\"\n| where DeviceAction !contains \"block\"\n| summarize ProtocolCount=count()  by ApplicationProtocol\n| top 5 by ProtocolCount desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "0f3c1d78-5091-407c-b18f-58000f30041c"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 URL Application Protocols Allowed",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "22": {
            "position": {
              "x": 6,
              "y": 22,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID == \"url\"\n| summarize ActionCount=count() by DeviceAction, TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "ActionCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "DeviceAction",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "f5125ccb-e1eb-4b9b-8f2b-036114a77a9e"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Web-filter Action Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "23": {
            "position": {
              "x": 12,
              "y": 22,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID == \"url\"\n| where DeviceAction in (\"alert\", \"continue\")\n| summarize IPCount=count() by SourceIP\n| top 5 by IPCount  desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "6eddd113-ead6-4d99-b093-43f13c4aa75d"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Web Traffic Source IP Addresses Allowed",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "24": {
            "position": {
              "x": 0,
              "y": 26,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Top 5 IP Address </div>  ",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "25": {
            "position": {
              "x": 0,
              "y": 27,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"TRAFFIC\"\n| where DeviceCustomString4  == \"Trust\"\n| where DeviceAction contains  \"drop\"\n| summarize Attempts=count() by DestinationIP\n| top 5 by Attempts desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "dfa58891-80f3-4748-8b28-b37754d607de"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": " Top 5 Outbound Destination IP Addresses Blocked",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "26": {
            "position": {
              "x": 6,
              "y": 27,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top 5 Public IP Addresses Allowed\nCommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"TRAFFIC\"\n| where DeviceCustomString4  == \"Trust\"\n| where DeviceAction !contains  \"drop\"\n| summarize Attempts=count() by DestinationIP\n| top 5 by Attempts desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "57635d84-06c1-4198-8eda-69a1d4fafaf1"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Public IP Addresses Allowed",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "27": {
            "position": {
              "x": 12,
              "y": 27,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"TRAFFIC\"\n| extend Direction=iff(DeviceCustomString4==\"Trust\",\"Outbound\" ,\"Inbound\" )\n| summarize DataSentOutBoundMB=sumif(SentBytes, Direction==\"Outbound\")/1048576 by SourceIP\n| top 5 by DataSentOutBoundMB desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "9867ef10-79bc-44a7-8149-97b1e5046a0f"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Source IP  Addresses By Data Volume",
                  "PartSubTitle": "{Workspace_Name}",
                  "Query": "CommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"TRAFFIC\"\n| extend Direction=iff(DeviceCustomString4==\"Trust\",\"Outbound\" ,\"Inbound\" )\n| summarize DataSentMB=sumif(SentBytes, Direction==\"Outbound\")/1048576 by SourceIP\n| top 5 by DataSentMB desc\n"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "28": {
            "position": {
              "x": 18,
              "y": 27,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID == \"url\"\n| where DeviceAction in (\"block-url\", \"block-continue\")\n| summarize IPCount=count() by SourceIP\n| top 5 by IPCount  desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "0e8aeba2-c9b5-4177-a448-957672c32cfd"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Source IP Addresses Blocked",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "29": {
            "position": {
              "x": 0,
              "y": 31,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\r\n| where DeviceProduct  == \"PAN-OS\" \r\n| where DeviceVendor == \"Palo Alto Networks\" \r\n| where Activity == \"TRAFFIC\" \r\n| where DeviceCustomString4  == \"Untrust\"\r\n| where DeviceAction !contains  \"drop\" \r\n| summarize Attempts=count() by DestinationIP \r\n| top 5 by Attempts desc \r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "28726f45-0a2f-420e-947d-3ec54927961e"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Inbound Destination IP Addresses Allowed",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "30": {
            "position": {
              "x": 6,
              "y": 31,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"TRAFFIC\"\n| where DeviceCustomString4 == \"Trust\"\n| where DeviceAction contains  \"drop\"\n| summarize Attempts=count() by SourceIP\n| top 5 by Attempts desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "bfa478a8-94f4-4bb5-9a10-186cf524525d"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Source IP Addresses Drop",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "31": {
            "position": {
              "x": 12,
              "y": 31,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "// top source with Allowed outbound traffic\nCommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"TRAFFIC\"\n| where DeviceCustomString4 == \"Trust\"\n| where DeviceAction !contains  \"drop\"\n| summarize Attempts=count() by SourceIP\n| top 5 by Attempts desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "265902b0-6b54-45e4-9d5f-b2447ed8c332"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Outbound Source IP Addresses Allowed",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "32": {
            "position": {
              "x": 0,
              "y": 35,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Wildfire</div>  ",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "33": {
            "position": {
              "x": 0,
              "y": 36,
              "colSpan": 12,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID == \"wildfire\"\n| summarize ActionCount=count() by DeviceAction, TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "ActionCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "DeviceAction",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "36e213e6-6089-4824-acc4-691950f2c009"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Wildfire Action Count Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "34": {
            "position": {
              "x": 12,
              "y": 36,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID == \"wildfire\"\n| summarize ActionCount=count() by DeviceAction\n| top 5 by ActionCount desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "228183f6-c28d-4d53-a20c-a748c3a6a872"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Wildfire Action",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "35": {
            "position": {
              "x": 18,
              "y": 36,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID == \"wildfire\"\n| summarize VerdictCount=count() by DeviceCustomString2\n| top 5 by VerdictCount\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "59fbd976-2cb8-4040-aa62-ae61677a49fa"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 Wildfire Verdict",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "36": {
            "position": {
              "x": 0,
              "y": 40,
              "colSpan": 24,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Top 5 IP Address </div>  ",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "37": {
            "position": {
              "x": 0,
              "y": 41,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID == \"file\"\n| summarize ActionCount=count() by DeviceAction\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "DeviceAction",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "ActionCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "e23e5546-57a1-457d-a237-796ac347e3ff"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "File Type Action Summary By Count",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "38": {
            "position": {
              "x": 6,
              "y": 41,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID  == \"file\"\n| where DeviceAction contains \"deny\"\n| summarize ProtocolCount=count()  by ApplicationProtocol\n| top 5 by ProtocolCount desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "e5acd0ad-a4c7-42ff-8667-650bde7f78cd"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 File Application Protocols Denied",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "39": {
            "position": {
              "x": 12,
              "y": 41,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct  == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID  == \"file\"\n| where DeviceAction !contains \"deny\"\n| summarize ProtocolCount=count()  by ApplicationProtocol\n| top 5 by ProtocolCount desc\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "ee280592-3851-4110-b94f-3a8b39a88fa9"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 5 File Application Protocols Allowed",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "40": {
            "position": {
              "x": 18,
              "y": 41,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}",
                    "ResourceId": "/subscriptions/{Subscription_Id}/resourcegroups/{Resource_Group}/providers/microsoft.operationalInsights/workspaces/{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Palo Alto File Category By Action Summary\nCommonSecurityLog\n| where DeviceProduct == \"PAN-OS\" \n| where DeviceVendor == \"Palo Alto Networks\" \n| where Activity == \"THREAT\"\n| where DeviceEventClassID == \"file\" \n| extend PACategory= extract(\";cat=(.*?);\",1,AdditionalExtensions) \n| summarize CategoryCount=count() by PACategory\n"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "f18c04fe-8305-4a5f-8a3e-d65bf4135b3c"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Palo Alto File Category By Action Summary",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "41": {
            "position": {
              "x": 0,
              "y": 45,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceProduct == \"PAN-OS\"\n| where DeviceVendor == \"Palo Alto Networks\"\n| where Activity == \"THREAT\"\n| where DeviceEventClassID == \"file\"\n| summarize ActionCount=count() by DeviceAction, TimeGenerated\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "ActionCount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "DeviceAction",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "a1d90479-0bbb-49d2-880c-0a9e9ba1f81e"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "File Allow Deny Time Trend",
                  "PartSubTitle": "{Workspace_Name}"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "42": {
            "position": {
              "x": 0,
              "y": 0,
              "colSpan": 1,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [
                {
                  "name": "subscriptionId",
                  "value": "{Subscription_Id}"
                },
                {
                  "name": "resourceGroup",
                  "value": "{Resource_Group}"
                },
                {
                  "name": "workspaceName",
                  "value": "{Workspace_Name}"
                }
              ],
              "type": "Extension/Microsoft_Azure_Security_Insights/PartType/AsiOverviewPart",
              "defaultMenuItemId": "0"
            }
          }
        }
      }
    }
  }
},{
  "name": "PaloAltoThreatDashboard_{Workspace_Name}",
  "type": "Microsoft.Portal/dashboards",
  "location": "{Dashboard_Location}",
  "tags": {
    "addonKey": "PaloAltoThreatDashboard",
    "hidden-title": "Palo Alto Networks Threat - {Workspace_Name}",
    "version": "1.0",
    "workspaceName": "{Workspace_Name}"
  },
  "properties": {
    "lenses": {
      "0": {
        "order": 0,
        "parts": {
          "0": {
            "position": {
              "x": 0,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where Activity == 'THREAT'\n| where DeviceEventClassID == 'wildfire'\n| summarize count() by DeviceCustomString2\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "DeviceCustomString2",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoThreatDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "72b60b01-4813-4cb7-b913-16cfba0b534b"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "WildFire Verdicts",
                  "PartSubTitle": "Last 24 Hours"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "1": {
            "position": {
              "x": 6,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where Activity == \"THREAT\" and DeviceEventClassID != \"url\" and DeviceEventClassID != \"file\"\n| summarize count() by DeviceEventClassID"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "DeviceEventClassID",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoThreatDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "7be78514-27c6-45a8-9cb1-9d2bda498a95"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Threats by Subtypes",
                  "PartSubTitle": "Last 24 Hours"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "2": {
            "position": {
              "x": 12,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where Activity == \"THREAT\" and DeviceEventClassID != \"url\" and DeviceEventClassID != \"file\"\n| summarize count() by ApplicationProtocol\n| top 10 by count_"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "ApplicationProtocol",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoThreatDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "cb784592-d889-4f99-aad4-cfe194123a6c"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Threats by Applications",
                  "PartSubTitle": "Last 24 Hours"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "3": {
            "position": {
              "x": 0,
              "y": 5,
              "colSpan": 9,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where Activity == 'THREAT' and DeviceEventClassID != \"url\" and DeviceEventClassID != \"file\"\n| summarize count() by bin(TimeGenerated, 1h), DeviceEventClassID\n| render timechart\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "DeviceEventClassID",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoThreatDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "beacb551-cbfe-4f28-b1ec-2c230d748c05"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Threat Subtypes Over Time",
                  "PartSubTitle": "Last 24 Hours"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "4": {
            "position": {
              "x": 9,
              "y": 5,
              "colSpan": 9,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where Activity == 'THREAT' and DeviceEventClassID != \"url\" and DeviceEventClassID != \"file\"\n| summarize count() by bin(TimeGenerated, 1h), LogSeverity\n| render timechart\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "LogSeverity",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoThreatDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "7f6cea8f-a7c3-41a6-a12e-abe5059857e4"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Threat Severity Over Time",
                  "PartSubTitle": "Last 24 Hours"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "5": {
            "position": {
              "x": 0,
              "y": 9,
              "colSpan": 9,
              "rowSpan": 5
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceEventClassID == \"vulnerability\" \n| extend ThreatId = extract(\"cat=([^;]+)\",1,AdditionalExtensions) \n| summarize count() by ThreatId, LogSeverity\n| top 20 by count_"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoThreatDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "f846bd4d-0767-4cad-a2ac-534f4f618e6f"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top Vulnerability Events",
                  "PartSubTitle": "Last 24 Hours"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "6": {
            "position": {
              "x": 9,
              "y": 9,
              "colSpan": 9,
              "rowSpan": 5
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| search DeviceEventClassID:\"*virus*\"\n| summarize count() by RequestURL, DeviceEventClassID, DestinationIP, SourceIP, SourceUserID\n| top 20 by count_"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoThreatDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "48dc6a32-7164-415d-b2df-b3a87d8736fa"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top Virus and Malware Events",
                  "PartSubTitle": "Last 24 Hours"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "7": {
            "position": {
              "x": 0,
              "y": 14,
              "colSpan": 18,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "CommonSecurityLog\n| where DeviceEventClassID == \"correlation\" \n| extend ThreatId = extract(\"cat=([^;]+)\",1,AdditionalExtensions)\n| extend ThreatCategory = extract(\"PanOSThreatCategory=([^;]+)\",1, AdditionalExtensions)\n| summarize count() by ThreatId, ThreatCategory, LogSeverity\n| top 20 by count_\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/PaloAltoThreatDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "c2e08e81-0d14-4e06-b458-c46cda17bfbe"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top Correlation Events",
                  "PartSubTitle": "Last 24 Hours"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "8": {
            "position": {
              "x": 0,
              "y": 0,
              "colSpan": 1,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [
                {
                  "name": "subscriptionId",
                  "value": "{Subscription_Id}"
                },
                {
                  "name": "resourceGroup",
                  "value": "{Resource_Group}"
                },
                {
                  "name": "workspaceName",
                  "value": "{Workspace_Name}"
                }
              ],
              "type": "Extension/Microsoft_Azure_Security_Insights/PartType/AsiOverviewPart",
              "defaultMenuItemId": "0"
            }
          },
          "9": {
            "position": {
              "x": 1,
              "y": 0,
              "colSpan": 17,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Palo Alto Network Threat</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          }
        }
      }
    }
  }
},{
  "name": "SharePointAndOneDriveDashboard_{Workspace_Name}",
  "type": "Microsoft.Portal/dashboards",
  "location": "{Dashboard_Location}",
  "tags": {
    "addonKey": "SharePointAndOneDriveDashboard",
    "hidden-title": "SharePoint & OneDrive - {Workspace_Name}",
    "version": "1.0",
    "workspaceName": "{Workspace_Name}"
  },
  "properties": {
    "lenses": {
      "0": {
        "order": 0,
        "parts": {
          "0": {
            "position": {
              "x": 1,
              "y": 0,
              "colSpan": 17,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">General Overview</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "1": {
            "position": {
              "x": 19,
              "y": 0,
              "colSpan": 6,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Users</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "2": {
            "position": {
              "x": 0,
              "y": 1,
              "colSpan": 9,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\n| where OfficeWorkload in ('OneDrive', 'SharePoint')\n| summarize Amount = count() by Operation, bin_at(TimeGenerated, 1d, now()) \n| sort by Amount \n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "Amount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Operation",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/SharePointAndOneDriveDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "4a095d3a-bb9d-447b-ac09-bc1e83da3efb"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Bar"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Operations by time, type",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              },
              "filters": {
                "MsPortalFx_TimeRange": {
                  "model": {
                    "format": "local",
                    "granularity": "auto",
                    "relative": "1d"
                  }
                }
              }
            }
          },
          "3": {
            "position": {
              "x": 9,
              "y": 1,
              "colSpan": 9,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\n| where OfficeWorkload in ('OneDrive', 'SharePoint')\n| where TimeGenerated >= ago(14d)\n| summarize count() by bin_at(TimeGenerated, 1d, now())\n| extend Week = iff(TimeGenerated>=ago(7d), \"This Week\", \"Last Week\"), TimeGenerated = iff(TimeGenerated>=ago(7d), TimeGenerated, TimeGenerated + 7d)\n"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Week",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/SharePointAndOneDriveDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "6b6093d2-ae51-4cff-b134-dc50c5ab49a3"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                },
                {
                  "name": "TimeRange",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Activity per day",
                  "PartSubTitle": "Week Over Week"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              },
              "filters": {
                "MsPortalFx_TimeRange": {
                  "model": {
                    "format": "utc",
                    "granularity": "auto",
                    "relative": "1d"
                  }
                }
              }
            }
          },
          "4": {
            "position": {
              "x": 19,
              "y": 1,
              "colSpan": 6,
              "rowSpan": 6
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "OfficeActivity\n| where OfficeWorkload in ('OneDrive', 'SharePoint')\n| summarize Amount = count() by UserId\n| top 10 by Amount \n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/SharePointAndOneDriveDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "676dcffa-2ac9-458f-bae2-a1d3ec7c3b68"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 10 active users",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "5": {
            "position": {
              "x": 0,
              "y": 5,
              "colSpan": 9,
              "rowSpan": 6
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top sharepoint client IPS\nOfficeActivity\n| where OfficeWorkload in ('OneDrive', 'SharePoint')\n| summarize Amount = count() by Operation\n| top 10 by Amount\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/SharePointAndOneDriveDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "5b2a4a9d-343e-4c86-9a42-2ef7a7556594"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 10 operations",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "6": {
            "position": {
              "x": 9,
              "y": 5,
              "colSpan": 9,
              "rowSpan": 6
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top sharepoint sites\r\nOfficeActivity\r\n| where OfficeWorkload in ('OneDrive', 'SharePoint') and Site_Url != \"\"\r\n| summarize Amount = count() by Site_Url\r\n| top 10 by Amount \n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/SharePointAndOneDriveDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "bc02219c-5295-4bac-9e9f-d80fcb4da4a8"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top 10 sites",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "7": {
            "position": {
              "x": 19,
              "y": 7,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Top sharepoint client IPS\r\nOfficeActivity\r\n| where OfficeWorkload in ('OneDrive', 'SharePoint') and ClientIP != \"\"\r\n| summarize Amount = count() by ClientIP\r\n| top 6 by Amount \r\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "ClientIP",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "Amount",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/SharePointAndOneDriveDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "b238514f-d87a-475f-8b20-21c3d6359a4b"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Top client IP'S",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "8": {
            "position": {
              "x": 0,
              "y": 11,
              "colSpan": 18,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [],
              "type": "Extension/HubsExtension/PartType/MarkdownPart",
              "settings": {
                "content": {
                  "settings": {
                    "content": "<div style=\"font-size:300%;\">Files</div>",
                    "title": "",
                    "subtitle": ""
                  }
                }
              }
            }
          },
          "9": {
            "position": {
              "x": 19,
              "y": 11,
              "colSpan": 6,
              "rowSpan": 5
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "// Top file Downloads by users\nOfficeActivity\n| where OfficeWorkload in ('OneDrive', 'SharePoint')\n| where Operation == \"FileDownloaded\"\n| summarize Files = count() by UserId\n| top 10 by Files\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/SharePointAndOneDriveDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "56ea2b74-28cc-4c0c-81d5-f6219a094350"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Users which downloaded biggest amount of files",
                  "PartSubTitle": "Top 10"
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "10": {
            "position": {
              "x": 0,
              "y": 12,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Files Uploaded by type\r\nOfficeActivity\r\n| where OfficeWorkload in ('OneDrive', 'SharePoint')\r\n| where Operation == \"FileUploaded\"\r\n| summarize count() by SourceFileExtension\n"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "SourceFileExtension",
                      "type": "String"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/SharePointAndOneDriveDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "14b57fcb-b745-4d53-ac7c-a609b77132d4"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsDonut"
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Files uploaded by extension",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "11": {
            "position": {
              "x": 6,
              "y": 12,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Files Uploaded vs Files Downloaded\nOfficeActivity\n| where OfficeWorkload in ('OneDrive', 'SharePoint')\n| where Operation in (\"FileDownloaded\", \"FileUploaded\")\n| summarize count() by Operation, bin_at(TimeGenerated, 1h, now())"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Dimensions",
                  "value": {
                    "xAxis": {
                      "name": "TimeGenerated",
                      "type": "DateTime"
                    },
                    "yAxis": [
                      {
                        "name": "count_",
                        "type": "Int64"
                      }
                    ],
                    "splitBy": [
                      {
                        "name": "Operation",
                        "type": "String"
                      }
                    ],
                    "aggregation": "Sum"
                  }
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/SharePointAndOneDriveDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "aee77909-7653-4b8b-a038-e7c4871210d2"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsChart"
                },
                {
                  "name": "SpecificChart",
                  "value": "Line"
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Files - uploaded VS downloaded",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "12": {
            "position": {
              "x": 12,
              "y": 12,
              "colSpan": 6,
              "rowSpan": 4
            },
            "metadata": {
              "inputs": [
                {
                  "name": "ComponentId",
                  "value": {
                    "SubscriptionId": "{Subscription_Id}",
                    "ResourceGroup": "{Resource_Group}",
                    "Name": "{Workspace_Name}"
                  }
                },
                {
                  "name": "Query",
                  "value": "//Files Downloaded by type\nOfficeActivity\n| where OfficeWorkload in ('OneDrive', 'SharePoint')\n| where Operation == \"FileDownloaded\"\n| summarize count() by SourceFileExtension"
                },
                {
                  "name": "TimeRange",
                  "value": "P1D"
                },
                {
                  "name": "Version",
                  "value": "1.0"
                },
                {
                  "name": "DashboardId",
                  "value": "/subscriptions/{Subscription_Id}/resourceGroups/dashboards/providers/Microsoft.Portal/dashboards/SharePointAndOneDriveDashboard_{Workspace_Name}"
                },
                {
                  "name": "PartId",
                  "value": "f37b2285-8dd1-46ad-8803-328cf82e6a14"
                },
                {
                  "name": "PartTitle",
                  "value": "Analytics"
                },
                {
                  "name": "PartSubTitle",
                  "value": "{Workspace_Name}"
                },
                {
                  "name": "resourceTypeMode",
                  "value": "workspace"
                },
                {
                  "name": "ControlType",
                  "value": "AnalyticsGrid"
                },
                {
                  "name": "Dimensions",
                  "isOptional": true
                },
                {
                  "name": "SpecificChart",
                  "isOptional": true
                }
              ],
              "type": "Extension/AppInsightsExtension/PartType/AnalyticsPart",
              "settings": {
                "content": {
                  "PartTitle": "Files downloaded by extension",
                  "PartSubTitle": ""
                }
              },
              "asset": {
                "idInputName": "ComponentId",
                "type": "ApplicationInsights"
              }
            }
          },
          "13": {
            "position": {
              "x": 0,
              "y": 0,
              "colSpan": 1,
              "rowSpan": 1
            },
            "metadata": {
              "inputs": [
                {
                  "name": "subscriptionId",
                  "value": "{Subscription_Id}"
                },
                {
                  "name": "resourceGroup",
                  "value": "{Resource_Group}"
                },
                {
                  "name": "workspaceName",
                  "value": "{Workspace_Name}"
                }
              ],
              "type": "Extension/Microsoft_Azure_Security_Insights/PartType/AsiOverviewPart",
              "defaultMenuItemId": "0"
            }
          }
        }
      }
    }
  }
}];
