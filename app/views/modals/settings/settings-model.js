"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var user_service_1 = require("../../shared/user.service");
var userService;
var SettingsModel = (function (_super) {
    __extends(SettingsModel, _super);
    function SettingsModel(page, homeModel) {
        var _this = _super.call(this) || this;
        userService = new user_service_1.UserService();
        _this.page = page;
        _this.homeModel = homeModel;
        _this.families = _this.homeModel.families;
        _this.user = _this.homeModel.user;
        console.log('i am settings model');
        return _this;
    }
    SettingsModel.prototype.settingsTest = function () {
        console.log('here is a settings test.');
        this.homeModel.set('header_text', 'What the fart.');
    };
    SettingsModel.prototype.editRates = function () {
        this.homeModel.showSettings('/views/components/editrates/editrates.xml');
        this.homeModel.set('settingsTitle', 'Edit Rates');
    };
    SettingsModel.prototype.saveRates = function () {
        var _this = this;
        var data = {
            hourlyRate: this.get('user').hourlyRate,
            overtimeRate: this.get('user').overtimeRate
        };
        userService.updateUser(data).then(function (result) {
            console.log(result);
            _this.homeModel.hideSettings();
        });
    };
    return SettingsModel;
}(observable_1.Observable));
exports.SettingsModel = SettingsModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5ncy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhDQUEyQztBQU0zQywwREFBOEQ7QUFROUQsSUFBSSxXQUF3QixDQUFDO0FBQzdCO0lBQW1DLGlDQUFVO0lBQ3pDLHVCQUFZLElBQUksRUFBRSxTQUFTO1FBQTNCLFlBQ0ksaUJBQU8sU0FPVjtRQU5HLFdBQVcsR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQztRQUNoQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFBO1FBQ3ZDLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDOztJQUN2QyxDQUFDO0lBUU0sb0NBQVksR0FBbkI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUE7UUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLENBQUE7SUFDdkQsQ0FBQztJQUVNLGlDQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsMkNBQTJDLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLGlDQUFTLEdBQWhCO1FBQUEsaUJBU0M7UUFSRyxJQUFJLElBQUksR0FBRztZQUNQLFVBQVUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVU7WUFDdkMsWUFBWSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWTtTQUM5QyxDQUFBO1FBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTCxvQkFBQztBQUFELENBQUMsQUF0Q0QsQ0FBbUMsdUJBQVUsR0FzQzVDO0FBdENZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdmlldyBmcm9tICd1aS9jb3JlL3ZpZXcnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSAnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZSc7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gJ3VpL2RpYWxvZ3MnO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgKiBhcyBmcmFtZSBmcm9tICd1aS9mcmFtZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSwgVXNlciB9IGZyb20gJy4uLy4uL3NoYXJlZC91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xuaW1wb3J0IHsgQW5pbWF0aW9uRGVmaW5pdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSAndWkvbGF5b3V0cy9zdGFjay1sYXlvdXQnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZmlsZS1zeXN0ZW0nO1xuaW1wb3J0ICogYXMgYnVpbGRlciBmcm9tICd1aS9idWlsZGVyJztcblxubGV0IHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZTtcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgY29uc3RydWN0b3IocGFnZSwgaG9tZU1vZGVsKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHVzZXJTZXJ2aWNlID0gbmV3IFVzZXJTZXJ2aWNlKCk7XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIHRoaXMuaG9tZU1vZGVsID0gaG9tZU1vZGVsO1xuICAgICAgICB0aGlzLmZhbWlsaWVzID0gdGhpcy5ob21lTW9kZWwuZmFtaWxpZXNcbiAgICAgICAgdGhpcy51c2VyID0gdGhpcy5ob21lTW9kZWwudXNlcjtcbiAgICAgICAgY29uc29sZS5sb2coJ2kgYW0gc2V0dGluZ3MgbW9kZWwnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhZ2U7XG4gICAgcHJpdmF0ZSBob21lTW9kZWw7XG5cbiAgICBwdWJsaWMgZmFtaWxpZXM7XG4gICAgcHVibGljIHVzZXI7XG5cbiAgICBwdWJsaWMgc2V0dGluZ3NUZXN0KCkge1xuICAgICAgICBjb25zb2xlLmxvZygnaGVyZSBpcyBhIHNldHRpbmdzIHRlc3QuJylcbiAgICAgICAgdGhpcy5ob21lTW9kZWwuc2V0KCdoZWFkZXJfdGV4dCcsICdXaGF0IHRoZSBmYXJ0LicpXG4gICAgfVxuXG4gICAgcHVibGljIGVkaXRSYXRlcygpIHtcbiAgICAgICAgdGhpcy5ob21lTW9kZWwuc2hvd1NldHRpbmdzKCcvdmlld3MvY29tcG9uZW50cy9lZGl0cmF0ZXMvZWRpdHJhdGVzLnhtbCcpO1xuICAgICAgICB0aGlzLmhvbWVNb2RlbC5zZXQoJ3NldHRpbmdzVGl0bGUnLCAnRWRpdCBSYXRlcycpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzYXZlUmF0ZXMoKSB7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgaG91cmx5UmF0ZTogdGhpcy5nZXQoJ3VzZXInKS5ob3VybHlSYXRlLFxuICAgICAgICAgICAgb3ZlcnRpbWVSYXRlOiB0aGlzLmdldCgndXNlcicpLm92ZXJ0aW1lUmF0ZVxuICAgICAgICB9XG4gICAgICAgIHVzZXJTZXJ2aWNlLnVwZGF0ZVVzZXIoZGF0YSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuaG9tZU1vZGVsLmhpZGVTZXR0aW5ncygpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBcbn0iXX0=