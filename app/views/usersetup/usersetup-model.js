"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var page_1 = require("ui/page");
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var dialogs = require("ui/dialogs");
var appSettings = require("application-settings");
var frame = require("ui/frame");
var user_service_1 = require("../shared/user.service");
var enums_1 = require("ui/enums");
var userService;
var MyModel;
var UserSetup = (function (_super) {
    __extends(UserSetup, _super);
    function UserSetup() {
        var _this = _super.call(this) || this;
        _this.user = JSON.parse(appSettings.getString('userData'));
        _this.hourlyRate = _this.user.hourlyRate ? parseFloat(_this.user.hourlyRate) : '';
        _this.overtimeRate = _this.user.overtimeRate ? parseFloat(_this.user.overtimeRate) : '';
        _this.first_name = _this.user.first_name;
        _this.last_name = _this.user.last_name;
        _this.saving = false;
        _this.families = new observable_array_1.ObservableArray([]);
        _this.addingFamily = false;
        userService = new user_service_1.UserService();
        MyModel = _this;
        var uid = JSON.parse(appSettings.getString('uid'));
        console.log(uid);
        console.dir(_this.user.families);
        if (_this.user.families) {
            for (var x in _this.user.families) {
                _this.families.push(_this.user.families[x]);
            }
        }
        if (!_this.families.length) {
            _this.families.push({
                name: "None entered...",
                email: false
            });
        }
        return _this;
    }
    UserSetup.prototype.saveRates = function () {
        if (this.hourlyRate && this.overtimeRate && this.families.length && this.families.getItem(0).email && this.first_name && this.last_name) {
            var args = {
                hourlyRate: this.hourlyRate,
                overtimeRate: this.overtimeRate,
                first_name: this.first_name,
                last_name: this.last_name
            };
            userService.updateUser(args).then(function (result) {
                console.log('yay!');
                frame.topmost().navigate({
                    moduleName: '/views/home/home',
                    backstackVisible: false,
                    animated: true,
                    clearHistory: true
                });
            });
        }
        else {
            if (!this.hourlyRate || !this.overtimeRate) {
                alert('Please enter your hourly rate and overtime rate. If they are the same, enter it twice!');
            }
            else if (!this.first_name || !this.last_name) {
                alert('Please enter your name, we use it when emailing your families on your behalf.');
            }
            else if (!this.families.length || !this.families.getItem(0).email) {
                alert('Please enter at least one family.');
            }
        }
    };
    UserSetup.prototype.showAddFamily = function () {
        var view = frame.topmost().currentPage;
        var dimmer = page_1.getViewById(view, 'dimmer');
        var picker = page_1.getViewById(view, 'chooser_holder');
        this.set('addingFamily', true);
        dimmer.opacity = 0;
        dimmer.animate({
            opacity: 1,
            duration: 500,
            curve: enums_1.AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        });
        picker.opacity = 0;
        picker.scaleX = .7;
        picker.scaleY = .7;
        picker.animate({
            opacity: 1,
            scale: { x: 1, y: 1 },
            duration: 300,
            curve: enums_1.AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        });
    };
    UserSetup.prototype.addFamily = function () {
        var _this = this;
        var familyObj = {
            name: this.addingFamilyName,
            email: this.addingFamilyEmail
        };
        this.closeAddFamily();
        userService.addFamily(familyObj).then(function (result) {
            familyObj.id = result.key;
            if (_this.families.length && !_this.families.getItem(0).email)
                _this.families.pop();
            _this.families.push(familyObj);
            var uid = JSON.parse(appSettings.getString('uid'));
            userService.getUser(uid).then(function () {
                _this.set('addingFamilyName', '');
                _this.set('addingFamilyEmail', '');
            });
        });
    };
    UserSetup.prototype.closeAddFamily = function () {
        var _this = this;
        var view = frame.topmost().currentPage;
        var dimmer = page_1.getViewById(view, 'dimmer');
        var picker = page_1.getViewById(view, 'chooser_holder');
        dimmer.animate({
            opacity: 0,
            duration: 500,
            curve: enums_1.AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        }).then(function () {
            _this.set('addingFamily', false);
        });
        picker.animate({
            opacity: 0,
            scale: { x: .7, y: .7 },
            duration: 300,
            curve: enums_1.AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        });
    };
    UserSetup.prototype.alert = function () {
        alert('Hi');
    };
    UserSetup.prototype.removeFamily = function (args) {
        var famId = args.object.id;
        dialogs.confirm('Are you sure you want to remove this family?').then(function (decision) {
            if (decision) {
                userService.updateFamily(famId, { deleted: true }).then(function (result) {
                    var deleteIndex;
                    MyModel.families.forEach(function (element, index) {
                        if (element.id == famId)
                            deleteIndex = index;
                    });
                    MyModel.families.splice(deleteIndex, 1);
                    if (!MyModel.families.length) {
                        MyModel.families.push({
                            name: "None entered...",
                            email: false
                        });
                    }
                });
            }
        });
    };
    UserSetup.prototype.kill = function () {
        appSettings.remove('userData');
        appSettings.remove('uid');
        appSettings.remove('userRecordID');
        frame.topmost().navigate('/views/login/login');
    };
    return UserSetup;
}(observable_1.Observable));
exports.UserSetup = UserSetup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnNldHVwLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlcnNldHVwLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0NBQTRDO0FBRTVDLDhDQUE2QztBQUM3QywwREFBd0Q7QUFFeEQsb0NBQXNDO0FBQ3RDLGtEQUFvRDtBQUVwRCxnQ0FBa0M7QUFDbEMsdURBQTJEO0FBRTNELGtDQUEwQztBQUUxQyxJQUFJLFdBQXdCLENBQUM7QUFDN0IsSUFBSSxPQUFrQixDQUFDO0FBRXZCO0lBQStCLDZCQUFVO0lBQ3JDO1FBQUEsWUFDSSxpQkFBTyxTQWtCVjtRQUNNLFVBQUksR0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMzRCxnQkFBVSxHQUFRLEtBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvRSxrQkFBWSxHQUFRLEtBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNyRixnQkFBVSxHQUFXLEtBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzFDLGVBQVMsR0FBVyxLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QyxZQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGNBQVEsR0FBRyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkMsa0JBQVksR0FBWSxLQUFLLENBQUM7UUF6QmpDLFdBQVcsR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQztRQUNoQyxPQUFPLEdBQUcsS0FBSSxDQUFDO1FBRWYsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxD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LFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzs0QkFDbEIsSUFBSSxFQUFFLGlCQUFpQjs0QkFDdkIsS0FBSyxFQUFFLEtBQUs7eUJBQ2YsQ0FBQyxDQUFDO29CQUNQLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sd0JBQUksR0FBWDtRQUNJLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25DLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBekpELENBQStCLHVCQUFVLEdBeUp4QztBQXpKWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2UsIGdldFZpZXdCeUlkIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gJ3VpL2xheW91dHMvc3RhY2stbGF5b3V0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlLWFycmF5JztcbmltcG9ydCAqIGFzIGZpcmViYXNlIGZyb20gJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UnO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tICd1aS9kaWFsb2dzJztcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICogYXMgZnJhbWUgZnJvbSAndWkvZnJhbWUnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UsIFVzZXIgfSBmcm9tICcuLi9zaGFyZWQvdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFuaW1hdGlvbkRlZmluaXRpb24gfSBmcm9tIFwidWkvYW5pbWF0aW9uXCI7XG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xuXG5sZXQgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlO1xubGV0IE15TW9kZWw6IFVzZXJTZXR1cDtcblxuZXhwb3J0IGNsYXNzIFVzZXJTZXR1cCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB1c2VyU2VydmljZSA9IG5ldyBVc2VyU2VydmljZSgpO1xuICAgICAgICBNeU1vZGVsID0gdGhpcztcblxuICAgICAgICBsZXQgdWlkID0gSlNPTi5wYXJzZShhcHBTZXR0aW5ncy5nZXRTdHJpbmcoJ3VpZCcpKTtcbiAgICAgICAgY29uc29sZS5sb2codWlkKTtcbiAgICAgICAgY29uc29sZS5kaXIodGhpcy51c2VyLmZhbWlsaWVzKTtcbiAgICAgICAgaWYgKHRoaXMudXNlci5mYW1pbGllcykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCBpbiB0aGlzLnVzZXIuZmFtaWxpZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZhbWlsaWVzLnB1c2godGhpcy51c2VyLmZhbWlsaWVzW3hdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZmFtaWxpZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmZhbWlsaWVzLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiTm9uZSBlbnRlcmVkLi4uXCIsXG4gICAgICAgICAgICAgICAgZW1haWw6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgdXNlcjogVXNlciA9IEpTT04ucGFyc2UoYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKCd1c2VyRGF0YScpKTtcbiAgICBwdWJsaWMgaG91cmx5UmF0ZTogYW55ID0gdGhpcy51c2VyLmhvdXJseVJhdGUgPyBwYXJzZUZsb2F0KHRoaXMudXNlci5ob3VybHlSYXRlKSA6ICcnO1xuICAgIHB1YmxpYyBvdmVydGltZVJhdGU6IGFueSA9IHRoaXMudXNlci5vdmVydGltZVJhdGUgPyBwYXJzZUZsb2F0KHRoaXMudXNlci5vdmVydGltZVJhdGUpIDogJyc7XG4gICAgcHVibGljIGZpcnN0X25hbWU6IHN0cmluZyA9IHRoaXMudXNlci5maXJzdF9uYW1lO1xuICAgIHB1YmxpYyBsYXN0X25hbWU6IHN0cmluZyA9IHRoaXMudXNlci5sYXN0X25hbWU7XG4gICAgcHVibGljIHNhdmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBmYW1pbGllcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoW10pO1xuICAgIHB1YmxpYyBhZGRpbmdGYW1pbHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgYWRkaW5nRmFtaWx5TmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBhZGRpbmdGYW1pbHlFbWFpbDogc3RyaW5nO1xuXG4gICAgcHVibGljIHNhdmVSYXRlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuaG91cmx5UmF0ZSAmJiB0aGlzLm92ZXJ0aW1lUmF0ZSAmJiB0aGlzLmZhbWlsaWVzLmxlbmd0aCAmJiB0aGlzLmZhbWlsaWVzLmdldEl0ZW0oMCkuZW1haWwgJiYgdGhpcy5maXJzdF9uYW1lICYmIHRoaXMubGFzdF9uYW1lKSB7XG4gICAgICAgICAgICBsZXQgYXJncyA9IHtcbiAgICAgICAgICAgICAgICBob3VybHlSYXRlOiB0aGlzLmhvdXJseVJhdGUsXG4gICAgICAgICAgICAgICAgb3ZlcnRpbWVSYXRlOiB0aGlzLm92ZXJ0aW1lUmF0ZSxcbiAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiB0aGlzLmZpcnN0X25hbWUsXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiB0aGlzLmxhc3RfbmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXNlclNlcnZpY2UudXBkYXRlVXNlcihhcmdzKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3lheSEnKTtcbiAgICAgICAgICAgICAgICBmcmFtZS50b3Btb3N0KCkubmF2aWdhdGUoe1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnL3ZpZXdzL2hvbWUvaG9tZScsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tzdGFja1Zpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaG91cmx5UmF0ZSB8fCAhdGhpcy5vdmVydGltZVJhdGUpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnUGxlYXNlIGVudGVyIHlvdXIgaG91cmx5IHJhdGUgYW5kIG92ZXJ0aW1lIHJhdGUuIElmIHRoZXkgYXJlIHRoZSBzYW1lLCBlbnRlciBpdCB0d2ljZSEnKVxuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5maXJzdF9uYW1lIHx8ICF0aGlzLmxhc3RfbmFtZSkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQbGVhc2UgZW50ZXIgeW91ciBuYW1lLCB3ZSB1c2UgaXQgd2hlbiBlbWFpbGluZyB5b3VyIGZhbWlsaWVzIG9uIHlvdXIgYmVoYWxmLicpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmZhbWlsaWVzLmxlbmd0aCB8fCAhdGhpcy5mYW1pbGllcy5nZXRJdGVtKDApLmVtYWlsKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciBhdCBsZWFzdCBvbmUgZmFtaWx5LicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dBZGRGYW1pbHkoKSB7XG4gICAgICAgIGxldCB2aWV3ID0gZnJhbWUudG9wbW9zdCgpLmN1cnJlbnRQYWdlOyAgICBcbiAgICAgICAgbGV0IGRpbW1lcjpTdGFja0xheW91dCA9IDxTdGFja0xheW91dD5nZXRWaWV3QnlJZCh2aWV3LCAnZGltbWVyJyk7XG4gICAgICAgIGxldCBwaWNrZXI6U3RhY2tMYXlvdXQgPSA8U3RhY2tMYXlvdXQ+Z2V0Vmlld0J5SWQodmlldywgJ2Nob29zZXJfaG9sZGVyJyk7XG4gICAgICAgIHRoaXMuc2V0KCdhZGRpbmdGYW1pbHknLCB0cnVlKTtcbiAgICAgICAgZGltbWVyLm9wYWNpdHkgPSAwO1xuICAgICAgICBkaW1tZXIuYW5pbWF0ZSg8QW5pbWF0aW9uRGVmaW5pdGlvbj57XG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgICAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllcigwLjEsIDAuMSwgMC4xLCAxKVxuICAgICAgICB9KVxuICAgICAgICBwaWNrZXIub3BhY2l0eSA9IDA7XG4gICAgICAgIHBpY2tlci5zY2FsZVggPSAuNztcbiAgICAgICAgcGlja2VyLnNjYWxlWSA9IC43O1xuICAgICAgICBwaWNrZXIuYW5pbWF0ZSg8QW5pbWF0aW9uRGVmaW5pdGlvbj57XG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgc2NhbGU6IHt4OiAxLCB5OiAxfSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICAgICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuY3ViaWNCZXppZXIoMC4xLCAwLjEsIDAuMSwgMSlcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHVibGljIGFkZEZhbWlseSgpIHtcbiAgICAgICAgbGV0IGZhbWlseU9iajphbnkgPSB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLmFkZGluZ0ZhbWlseU5hbWUsXG4gICAgICAgICAgICBlbWFpbDogdGhpcy5hZGRpbmdGYW1pbHlFbWFpbFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNsb3NlQWRkRmFtaWx5KCk7XG4gICAgICAgIHVzZXJTZXJ2aWNlLmFkZEZhbWlseShmYW1pbHlPYmopLnRoZW4oKHJlc3VsdDphbnkpID0+IHtcbiAgICAgICAgICAgIGZhbWlseU9iai5pZCA9IHJlc3VsdC5rZXk7XG4gICAgICAgICAgICBpZiAodGhpcy5mYW1pbGllcy5sZW5ndGggJiYgIXRoaXMuZmFtaWxpZXMuZ2V0SXRlbSgwKS5lbWFpbCkgdGhpcy5mYW1pbGllcy5wb3AoKTtcblxuICAgICAgICAgICAgdGhpcy5mYW1pbGllcy5wdXNoKGZhbWlseU9iailcbiAgICAgICAgICAgIGxldCB1aWQgPSBKU09OLnBhcnNlKGFwcFNldHRpbmdzLmdldFN0cmluZygndWlkJykpO1xuICAgICAgICAgICAgdXNlclNlcnZpY2UuZ2V0VXNlcih1aWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KCdhZGRpbmdGYW1pbHlOYW1lJywgJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KCdhZGRpbmdGYW1pbHlFbWFpbCcsICcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2VBZGRGYW1pbHkoKSB7XG4gICAgICAgIGxldCB2aWV3ID0gZnJhbWUudG9wbW9zdCgpLmN1cnJlbnRQYWdlOyAgICBcbiAgICAgICAgbGV0IGRpbW1lcjpTdGFja0xheW91dCA9IDxTdGFja0xheW91dD5nZXRWaWV3QnlJZCh2aWV3LCAnZGltbWVyJyk7XG4gICAgICAgIGxldCBwaWNrZXI6U3RhY2tMYXlvdXQgPSA8U3RhY2tMYXlvdXQ+Z2V0Vmlld0J5SWQodmlldywgJ2Nob29zZXJfaG9sZGVyJyk7XG4gICAgICAgIGRpbW1lci5hbmltYXRlKDxBbmltYXRpb25EZWZpbml0aW9uPntcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmN1YmljQmV6aWVyKDAuMSwgMC4xLCAwLjEsIDEpXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXQoJ2FkZGluZ0ZhbWlseScsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBpY2tlci5hbmltYXRlKDxBbmltYXRpb25EZWZpbml0aW9uPntcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICBzY2FsZToge3g6IC43LCB5OiAuN30sXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmN1YmljQmV6aWVyKDAuMSwgMC4xLCAwLjEsIDEpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIGFsZXJ0KCkge1xuICAgICAgICBhbGVydCgnSGknKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlRmFtaWx5KGFyZ3MpIHtcbiAgICAgICAgbGV0IGZhbUlkID0gYXJncy5vYmplY3QuaWQ7XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlbW92ZSB0aGlzIGZhbWlseT8nKS50aGVuKChkZWNpc2lvbikgPT4ge1xuICAgICAgICAgICAgaWYgKGRlY2lzaW9uKSB7XG4gICAgICAgICAgICAgICAgdXNlclNlcnZpY2UudXBkYXRlRmFtaWx5KGZhbUlkLCB7ZGVsZXRlZDogdHJ1ZX0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGVsZXRlSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIE15TW9kZWwuZmFtaWxpZXMuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmlkID09IGZhbUlkKSBkZWxldGVJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgTXlNb2RlbC5mYW1pbGllcy5zcGxpY2UoZGVsZXRlSW5kZXgsIDEpXG4gICAgICAgICAgICAgICAgICAgIGlmICghTXlNb2RlbC5mYW1pbGllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE15TW9kZWwuZmFtaWxpZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJOb25lIGVudGVyZWQuLi5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMga2lsbCgpIHtcbiAgICAgICAgYXBwU2V0dGluZ3MucmVtb3ZlKCd1c2VyRGF0YScpO1xuICAgICAgICBhcHBTZXR0aW5ncy5yZW1vdmUoJ3VpZCcpO1xuICAgICAgICBhcHBTZXR0aW5ncy5yZW1vdmUoJ3VzZXJSZWNvcmRJRCcpO1xuICAgICAgICBmcmFtZS50b3Btb3N0KCkubmF2aWdhdGUoJy92aWV3cy9sb2dpbi9sb2dpbicpO1xuICAgIH1cbn0iXX0=